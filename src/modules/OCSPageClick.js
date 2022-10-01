function OCSPageClick(evt, maxChars, dispatchWithString) {
  {
    const selection = window.getSelection();
    const OCS = document.getElementById("OneClickSearch");
    const checks = [
      // Check the click was outside of the popup
      !OCS?.contains(evt.target) ?? false,

      // Check selection is not empty
      selection != "",

      // Check the selection is a range
      selection["type"] === "Range",

      // Check the selection is text and not mixed content
      selection.focusNode?.nodeType == Node.TEXT_NODE,

      // Check the maximum number of characters is unlimited or has not been exceeded
      maxChars === "0" ||
        (selection.toString().length > 0 &&
          selection.toString().length <= maxChars),
    ];

    if (checks.every((val) => val === true)) {
      dispatchWithString(selection.toString());
    } else if (!OCS?.contains(evt.target) ?? false) {
      dispatchWithString("");
    }
  }
}

export default OCSPageClick;
