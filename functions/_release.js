// Keep this version aligned with the filename of the ZIP uploaded to private R2.
export const version = "2.13.4";
export const filename = `BarCodeR_v${version}_Windows.zip`;
export const archiveKey = `releases/${filename}`;

export const apiHeaders = {
  "Cache-Control": "private, no-store",
  "X-Robots-Tag": "noindex",
  "X-Content-Type-Options": "nosniff",
};

export function isReleased(env) {
  return env.BARCODER_PUBLIC_RELEASED === "true";
}

export async function getArchive(env) {
  const bucket = env.BARCODER_RELEASES;
  if (!bucket) return { status: 503 };
  try {
    const object = await bucket.head(archiveKey);
    return object ? { bucket, object } : { status: 404 };
  } catch {
    return { status: 502 };
  }
}
