import Functions from "../../modules/TextFunctions";
import styles from "./OneClickSearch.modules.less";

const OCSFunctionIcon = ({ provider, text, onIconClick }) => {
  const theFunction = Functions[provider.name];

  const clickHandler = (e) => {
    e.preventDefault();
    theFunction(text);
    onIconClick();
  };

  return (
    <div className={[styles.OCSicon, styles[provider.visibility]].join(" ")}>
      <a onClick={clickHandler} key={provider.name}>
        <img src={chrome.runtime.getURL(provider.faviconUrl)}></img>
      </a>
    </div>
  );
};
export default OCSFunctionIcon;
