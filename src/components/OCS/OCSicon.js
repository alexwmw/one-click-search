import clsx from "clsx";
import { useState } from "react";
import Functions from "../../modules/TextFunctions";
import Img from "../Images/Img";
import styles from "./OneClickSearch.modules.less";

function OCSIcon({ provider, text, onIconClick, linkTarget, allowTitles }) {
  const [pulse, setPulse] = useState(true);

  /** Do not render if regex criteria are not met */
  if (provider.regex) {
    const regex = new RegExp(provider.regex);
    if (/\s/g.test(text) || !text.match(regex)) {
      return null;
    }
  }

  const isProvider = provider.role === "provider";
  const isFunction = provider.role === "function";

  // Construct URL
  let encodedText, url, queryPath, searchUrl;

  if (isProvider) {
    encodedText = encodeURIComponent(text.trim());
    url = `https://${provider.hostname}/`;
    queryPath = provider.queryPath.replaceAll("$TEXT$", encodedText);
    searchUrl = url + queryPath;
  }

  const title = allowTitles ? provider.title ?? provider.name : "";

  const imgSrc = isProvider
    ? provider.faviconUrl || url + "favicon.ico"
    : chrome.runtime.getURL(provider.faviconUrl);

  const clickHandler = (e) => {
    if (isFunction) {
      const theFunction = Functions[provider.name];
      e.preventDefault();
      theFunction({ text, linkTarget });
    }
    onIconClick();
  };

  return (
    <div
      className={clsx(
        styles.OCSicon,
        styles[provider.visibility],
        styles[`${provider.role}Icon`],
        isFunction && pulse && styles.pulsing
      )}
      title={title}
      onMouseEnter={(e) => setPulse(false)}
    >
      <a onClick={clickHandler} target={linkTarget} href={searchUrl ?? ""}>
        <Img src={imgSrc}></Img>
      </a>
    </div>
  );
}
export default OCSIcon;
