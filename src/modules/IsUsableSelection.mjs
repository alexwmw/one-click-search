const isUsableSelection = (selection, maxChars) => {
  if (!selection || selection.isCollapsed || selection.rangeCount < 1) {
    return false;
  }

  const text = selection.toString();
  if (!text.trim()) return false;

  const unlimited = maxChars === "0" || maxChars === 0;
  return unlimited || text.length <= Number(maxChars);
};

export default isUsableSelection;
