/**
 * Functions assigned to the click of icons representing the objects found in functions.json
 *
 * Each functions receives the selected text captured by window.getSelection
 *
 */
const TextFunctions = {
  Copy: (text) => {
    navigator.clipboard.writeText(text);
  },

  GoTo: (text) => {
    window.location.href = text;
  },
};
export default TextFunctions;
