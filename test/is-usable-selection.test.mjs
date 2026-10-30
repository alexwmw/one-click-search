import test from "node:test";
import assert from "node:assert/strict";
import isUsableSelection from "../src/modules/IsUsableSelection.mjs";

const makeSelection = ({
  text = "Selected text",
  isCollapsed = false,
  rangeCount = 1,
  focusNode = { nodeType: 3 },
} = {}) => ({
  isCollapsed,
  rangeCount,
  focusNode,
  toString: () => text,
});

test("accepts a normal text-node selection", () => {
  assert.equal(isUsableSelection(makeSelection(), 100), true);
});

test("accepts a text selection whose focus is an element node", () => {
  const elementNode = { nodeType: 1 };
  assert.equal(
    isUsableSelection(makeSelection({ focusNode: elementNode }), 100),
    true
  );
});

test("accepts non-collapsed text ranges spanning nested markup", () => {
  const nestedContentSelection = makeSelection({
    text: "First part bold second part",
    focusNode: { nodeType: 1 },
  });
  assert.equal(isUsableSelection(nestedContentSelection, 100), true);
});

test("rejects missing, collapsed, and range-less selections", () => {
  assert.equal(isUsableSelection(null, 100), false);
  assert.equal(isUsableSelection(makeSelection({ isCollapsed: true }), 100), false);
  assert.equal(isUsableSelection(makeSelection({ rangeCount: 0 }), 100), false);
});

test("rejects empty and whitespace-only selections", () => {
  assert.equal(isUsableSelection(makeSelection({ text: "" }), 100), false);
  assert.equal(isUsableSelection(makeSelection({ text: "  \n  " }), 100), false);
});

test("enforces the character limit and accepts its boundary", () => {
  assert.equal(isUsableSelection(makeSelection({ text: "1234" }), 4), true);
  assert.equal(isUsableSelection(makeSelection({ text: "12345" }), 4), false);
});

test("zero character limit means unlimited", () => {
  assert.equal(isUsableSelection(makeSelection({ text: "a".repeat(5000) }), "0"), true);
});
