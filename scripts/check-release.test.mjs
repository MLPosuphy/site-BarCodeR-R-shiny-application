import assert from "node:assert/strict";
import { test } from "node:test";
import { onRequestGet, onRequestHead } from "../functions/api/download/barcoder.js";
import { onRequestGet as getStatus, onRequestHead as headStatus } from "../functions/api/release/status.js";
import { archiveKey, filename, version } from "../functions/_release.js";

const data = "0123456789";
const etag = "archive-etag";
const uploaded = new Date("2025-01-01T10:00:00Z");
const object = { size: data.length, etag, httpEtag: `"${etag}"`, uploaded };
const bucket = {
  async head(key) {
    assert.equal(key, archiveKey);
    return object;
  },
  async get(key, { range, onlyIf }) {
    assert.equal(key, archiveKey);
    assert.equal(onlyIf.etagMatches, etag);
    return new Response(range ? data.slice(range.offset, range.offset + range.length) : data);
  },
};
const env = { BARCODER_PUBLIC_RELEASED: "true", BARCODER_RELEASES: bucket };
const get = (binding, headers) => onRequestGet({ env: binding, request: new Request("https://example.com/api/download/barcoder", { headers }) });

function checkResponse(response, status) {
  assert.equal(response.status, status);
  assert.match(response.headers.get("cache-control"), /no-store/);
  assert.equal(response.headers.get("x-robots-tag"), "noindex");
}

test("unpublished GET, HEAD and Range never access R2", async () => {
  for (const value of [undefined, "false", "TRUE", " true", "1", "", true, null]) {
    const disabled = {
      BARCODER_PUBLIC_RELEASED: value,
      get BARCODER_RELEASES() { assert.fail("The R2 binding must not be accessed before publication"); },
    };
    for (const response of [await get(disabled), await get(disabled, { Range: "bytes=0-2" })]) {
      checkResponse(response, 403);
      assert.equal(response.headers.get("content-disposition"), null);
      assert.match(await response.text(), /not available/);
    }
    const head = await onRequestHead({ env: disabled });
    checkResponse(head, 403);
    assert.equal(head.body, null);
    const status = await getStatus({ env: disabled });
    checkResponse(status, 200);
    assert.deepEqual(await status.json(), { released: false });
  }
});

test("published download supports GET, HEAD, and status with the same release version", async () => {
  const head = await onRequestHead({ env });
  const response = await get(env);
  for (const file of [head, response]) {
    checkResponse(file, 200);
    assert.equal(file.headers.get("content-type"), "application/zip");
    assert.equal(file.headers.get("content-disposition"), `attachment; filename="${filename}"`);
    assert.equal(file.headers.get("content-length"), "10");
    assert.equal(file.headers.get("accept-ranges"), "bytes");
    assert.equal(file.headers.get("etag"), object.httpEtag);
    assert.equal(file.headers.get("last-modified"), uploaded.toUTCString());
  }
  assert.equal(head.body, null);
  assert.equal(await response.text(), data);
  const status = await getStatus({ env });
  checkResponse(status, 200);
  assert.deepEqual(await status.json(), { released: true, version });
  const statusHead = headStatus();
  checkResponse(statusHead, 200);
  assert.equal(statusHead.body, null);
});

test("single byte ranges, If-Range, and unsatisfiable ranges", async () => {
  for (const [range, first, last, validator] of [
    ["bytes=0-2", 0, 2],
    ["bytes=7-", 7, 9],
    ["bytes=-4", 6, 9],
    ["bytes=7-100", 7, 9, object.httpEtag],
    ["bytes=4-4", 4, 4, uploaded.toUTCString()],
  ]) {
    const response = await get(env, { Range: range, ...(validator && { "If-Range": validator }) });
    checkResponse(response, 206);
    assert.equal(response.headers.get("content-range"), `bytes ${first}-${last}/10`);
    assert.equal(response.headers.get("content-length"), String(last - first + 1));
    assert.equal(await response.text(), data.slice(first, last + 1));
  }
  const stale = await get(env, { Range: "bytes=0-2", "If-Range": '"old-etag"' });
  checkResponse(stale, 200);
  assert.equal(await stale.text(), data);
  for (const range of ["bytes=10-11", "bytes=4-1", "bytes=-0", "bytes=0-1,4-5", "bytes=a-"]) {
    const response = await get(env, { Range: range });
    checkResponse(response, 416);
    assert.equal(response.headers.get("content-range"), "bytes */10");
    assert.equal(response.body, null);
  }
});

test("missing binding, missing object and metadata errors keep release unavailable", async () => {
  for (const [binding, status] of [
    [undefined, 503],
    [{ head: async () => null }, 404],
    [{ head: async () => { throw Error("private bucket error"); } }, 502],
  ]) {
    const broken = { ...env, BARCODER_RELEASES: binding };
    const response = await get(broken);
    checkResponse(response, status);
    assert.doesNotMatch(await response.text(), /private bucket error/);
    const head = await onRequestHead({ env: broken });
    checkResponse(head, status);
    assert.equal(head.body, null);
    assert.deepEqual(await (await getStatus({ env: broken })).json(), { released: false });
  }
});

test("object replaced between HEAD and GET or read error never returns a corrupt ZIP", async () => {
  for (const handler of [async () => object, async () => { throw Error("private read error"); }]) {
    const response = await get({ ...env, BARCODER_RELEASES: { ...bucket, get: handler } }, { Range: "bytes=0-2" });
    checkResponse(response, 502);
    assert.equal(response.headers.get("content-disposition"), null);
    assert.doesNotMatch(await response.text(), /private read error/);
  }
});
