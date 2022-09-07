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

  GoTo: (text, newtab = true) => {
    if (text.indexOf("www") == 0) {
      newtab
        ? window.open("http://" + text.trim())
        : (window.location.href = "http://" + text.trim());
    } else {
      newtab ? window.open(text.trim()) : (window.location.href = text.trim());
    }
  },
};
export default TextFunctions;
