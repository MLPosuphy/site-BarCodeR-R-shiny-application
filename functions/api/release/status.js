import { apiHeaders, getArchive, isReleased, version } from "../../_release.js";

async function releaseStatus(env) {
  if (!isReleased(env)) return { released: false };
  const archive = await getArchive(env);
  return archive.object ? { released: true, version } : { released: false };
}

export async function onRequestGet({ env }) {
  return Response.json(await releaseStatus(env), { headers: apiHeaders });
}

export function onRequestHead() {
  return new Response(null, { headers: apiHeaders });
}
