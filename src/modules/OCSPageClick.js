import { isValidSelection } from "./Utilities";

function OCSPageClick(evt, maxChars, dispatchWithString) {
  {
    const selection = window.getSelection();
    const OCS = document.getElementById("OneClickSearch");
    const checks = [
      // Check the click was outside of the popup
      !OCS.contains(evt.target),
      // Check the text selection is a valid one
      isValidSelection(selection),
      // Check the maximum number of characters is unlimited or has not been exceeded
      maxChars === "0" || selection.toString().length <= maxChars,
    ];

    if (checks.every((val) => val === true)) {
      dispatchWithString(selection.toString());
    }
  }
}

export default OCSPageClick;
