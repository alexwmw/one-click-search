/**
 * Functions assigned to the click of icons representing the objects found in functions.json
 *
 * Each functions receives the selected text captured by window.getSelection
 *
 */
const TextFunctions = {
  Copy: ({ text }) => {
    navigator.clipboard.writeText(text);
  },

  GoTo: ({ text, target }) => {
    const https = text.indexOf("http") == 0 ? "" : "https://";
    window.open(https + text.trim(), target);
  },
};
export default TextFunctions;
