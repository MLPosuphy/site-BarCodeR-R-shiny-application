// Téléchargement de l'archive BarCodeR depuis un bucket Cloudflare R2 privé.
// La variable BARCODER_RELEASES doit être liée au bucket barcoder-releases dans Pages.
const filename = "BarCodeR_v2.13.4_Windows.zip";
const key = `releases/${filename}`;

function fileHeaders(object, length = object.size) {
  return new Headers({
    "Content-Type": "application/zip",
    "Content-Disposition": `attachment; filename="${filename}"`,
    "Content-Length": String(length),
    "Accept-Ranges": "bytes",
    "ETag": object.httpEtag,
    "Cache-Control": "private, no-store"
  });
}

function getBucket(env) {
  return env.BARCODER_RELEASES;
}

function parseRange(raw, size) {
  const match = /^bytes=(\d*)-(\d*)$/.exec(raw);
  if (!match || (!match[1] && !match[2])) return null;
  let start, end;
  if (!match[1]) {
    const suffix = Number(match[2]);
    if (!Number.isSafeInteger(suffix) || suffix <= 0) return null;
    start = Math.max(0, size - suffix);
    end = size - 1;
  } else {
    start = Number(match[1]);
    end = match[2] ? Number(match[2]) : size - 1;
    if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end)) return null;
    end = Math.min(end, size - 1);
  }
  if (start < 0 || start >= size || end < start) return null;
  return { start, end, length: end - start + 1 };
}

async function getMetadata(env) {
  const bucket = getBucket(env);
  if (!bucket) return { response: new Response("Liaison R2 absente", { status: 503 }) };
  const object = await bucket.head(key);
  if (!object) return { response: new Response("Archive BarCodeR introuvable dans R2", { status: 404 }) };
  return { bucket, object };
}

export async function onRequestHead({ env }) {
  const { response, object } = await getMetadata(env);
  if (response) return response;
  return new Response(null, { status: 200, headers: fileHeaders(object) });
}

export async function onRequestGet({ request, env }) {
  const { response, bucket, object } = await getMetadata(env);
  if (response) return response;

  const rawRange = request.headers.get("Range");
  const ifRange = request.headers.get("If-Range");
  const canUseRange = rawRange && (!ifRange || ifRange === object.httpEtag || ifRange === object.uploaded.toUTCString());
  const range = canUseRange ? parseRange(rawRange, object.size) : undefined;
  if (canUseRange && !range) {
    return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${object.size}`, "Accept-Ranges": "bytes" } });
  }

  const file = await bucket.get(key, range ? { range: { offset: range.start, length: range.length } } : undefined);
  if (!file || !file.body) return new Response("Impossible de lire le fichier R2", { status: 502 });

  const headers = fileHeaders(object, range ? range.length : object.size);
  if (range) headers.set("Content-Range", `bytes ${range.start}-${range.end}/${object.size}`);
  return new Response(file.body, { status: range ? 206 : 200, headers });
}
