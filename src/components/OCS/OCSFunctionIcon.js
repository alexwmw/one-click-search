import Functions from "../../modules/TextFunctions";

const OCSFunctionIcon = ({ provider, text, onIconClick }) => {
  const theFunction = Functions[provider.name];

  const clickHandler = (e) => {
    e.preventDefault();
    theFunction(text);
    onIconClick();
  };

  return (
    <div className={`OCSicon ${provider.visibility}`}>
      <a onClick={clickHandler} key={provider.name}>
        <img src={chrome.runtime.getURL(provider.faviconUrl)}></img>
      </a>
    </div>
  );
};
export default OCSFunctionIcon;
