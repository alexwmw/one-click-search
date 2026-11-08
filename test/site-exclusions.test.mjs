import test from "node:test";
import assert from "node:assert/strict";
import {
  hostnameFromUrl,
  isHostnameExcluded,
  normalizeHostname,
  updateExcludedSites,
} from "../src/modules/SiteExclusions.mjs";

test("normalizes hostnames and accepts only web URLs", () => {
  assert.equal(normalizeHostname(" WWW.Example.COM "), "example.com");
  assert.equal(hostnameFromUrl("https://www.example.com/a"), "example.com");
  assert.equal(hostnameFromUrl("chrome://extensions"), "");
  assert.equal(hostnameFromUrl("not a URL"), "");
});

test("matches exact domains and subdomains", () => {
  assert.equal(isHostnameExcluded("example.com", ["example.com"]), true);
  assert.equal(isHostnameExcluded("docs.example.com", ["example.com"]), true);
  assert.equal(isHostnameExcluded("example.org", ["example.com"]), false);
});

test("adds the current host only when it is not already effectively excluded", () => {
  assert.deepEqual(updateExcludedSites([], "www.docs.example.com", true), [
    "docs.example.com",
  ]);
  assert.deepEqual(updateExcludedSites(["example.com"], "docs.example.com", true), [
    "example.com",
  ]);
});

test("enabling a site removes exact and inherited exclusion rules", () => {
  assert.deepEqual(
    updateExcludedSites(
      ["example.com", "docs.example.com", "other.example.org"],
      "docs.example.com",
      false
    ),
    ["other.example.org"]
  );
});
