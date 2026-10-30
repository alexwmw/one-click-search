import isUsableSelection from "./IsUsableSelection.mjs";

function OCSPageClick(evt, maxChars, dispatchWithString) {
  const selection = window.getSelection();
  const popup = document.getElementById("OneClickSearch");

  if (popup?.contains(evt.target)) return;

  if (isUsableSelection(selection, maxChars)) {
    dispatchWithString(selection.toString());
  } else {
    dispatchWithString("");
  }
}

export default OCSPageClick;
