import { options } from "less";
import { OCSicon_function, OCSicon_provider } from "./OCSiconTypes";

function OCSicon({ provider, text }) {
  /** Local data */
  const $TEXT$ = text;
  // Replace with props options
  const options = { blankTarget: true };

  /** Do not render if regex criteria are not met (return null) */
  if (provider.regex) {
    const regExMet = RegExp(provider.regex).test(text);

    if (!regExMet) {
      return null;
    }
  }

  // Search provider icons are <a> links to search pages for the selected text
  if (provider.role == "provider") {
    return (
      <OCSicon_provider options={options} provider={provider} text={text} />
    );
  }

  // Function icons will execute a function when clicked on (e.preventDefault on <a>)
  if (provider.role == "function") {
    return <OCSicon_function provider={provider} text={text} />;
  }
}
export default OCSicon;
