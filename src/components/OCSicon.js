import { options } from "less";
import Functions from "../modules/TextFunctions";

function OCSicon({ provider, text }) {
  const $TEXT$ = text;

  const options = { blankTarget: true };

  if (provider.regex && !regex.test(text)) {
    return null;
  }

  // Search provider icons are <a> links to search pages for the selected text
  if (provider.role == "provider") {
    // Construct URL
    const encodedText = encodeURIComponent(text);
    const url = `http://${provider.hostname}/`;
    const queryPath = provider.queryPath.replace("$TEXT$", encodedText);
    const searchUrl = url + queryPath;

    return (
      <div className={`OCSicon ${provider.visibility}`}>
        <a target={options.blankTarget && "_blank"} href={searchUrl}>
          <img src={provider.faviconUrl || url + "favicon.ico"}></img>
        </a>
      </div>
    );
  }

  // Function icons will execute a function when clicked on (e.preventDefault on <a>)
  if (provider.role == "function") {
    const theFunction = Functions[provider.name];

    const clickHandler = (e) => {
      e.preventDefault();
      theFunction(text);
    };
    return (
      <div className={`OCSicon ${provider.visibility}`}>
        <a onClick={clickHandler} key={provider.name}>
          <img src={chrome.runtime.getURL(provider.faviconUrl)}></img>
        </a>
      </div>
    );
  }
}

export default OCSicon;
