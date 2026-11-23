import { apiHeaders, archiveKey, filename, getArchive, isReleased } from "../../_release.js";

function fileHeaders(object, length = object.size) {
  return new Headers({
    ...apiHeaders,
    "Content-Type": "application/zip",
    "Content-Disposition": `attachment; filename="${filename}"`,
    "Content-Length": String(length),
    "Accept-Ranges": "bytes",
    "ETag": object.httpEtag,
    "Last-Modified": object.uploaded.toUTCString(),
  });
}

const messages = {
  403: "The BarCodeR download is not available yet.",
  404: "The BarCodeR archive could not be found.",
  502: "The BarCodeR archive could not be read.",
  503: "The BarCodeR download service is unavailable.",
};

function unavailable(status, head = false) {
  return new Response(head ? null : messages[status], {
    status,
    headers: { ...apiHeaders, "Content-Type": "text/plain; charset=utf-8" },
  });
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

export async function onRequestHead({ env }) {
  if (!isReleased(env)) return unavailable(403, true);
  const { status, object } = await getArchive(env);
  if (status) return unavailable(status, true);
  return new Response(null, { status: 200, headers: fileHeaders(object) });
}

export async function onRequestGet({ request, env }) {
  if (!isReleased(env)) return unavailable(403);
  const { status, bucket, object } = await getArchive(env);
  if (status) return unavailable(status);

  const rawRange = request.headers.get("Range");
  const ifRange = request.headers.get("If-Range");
  const canUseRange = rawRange && (!ifRange || ifRange === object.httpEtag || ifRange === object.uploaded.toUTCString());
  const range = canUseRange ? parseRange(rawRange, object.size) : undefined;
  if (canUseRange && !range) {
    return new Response(null, { status: 416, headers: { ...apiHeaders, "Content-Range": `bytes */${object.size}`, "Accept-Ranges": "bytes" } });
  }

  let file;
  try {
    file = await bucket.get(archiveKey, {
      onlyIf: { etagMatches: object.etag },
      ...(range && { range: { offset: range.start, length: range.length } }),
    });
  } catch {
    return unavailable(502);
  }
  if (!file?.body) return unavailable(502);

  const headers = fileHeaders(object, range ? range.length : object.size);
  if (range) headers.set("Content-Range", `bytes ${range.start}-${range.end}/${object.size}`);
  return new Response(file.body, { status: range ? 206 : 200, headers });
}
