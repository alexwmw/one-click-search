import Functions from "../../modules/TextFunctions";

export const OCSicon_provider = ({ provider, text, options, closeOCS }) => {
  // Construct URL
  const encodedText = encodeURIComponent(text);
  const url = `http://${provider.hostname}/`;
  const queryPath = provider.queryPath.replace("$TEXT$", encodedText);
  const searchUrl = url + queryPath;

  return (
    <div className={`OCSicon ${provider.visibility}`}>
      <a
        onClick={(e) => {
          closeOCS(true);
        }}
        target={options.blankTarget && "_blank"}
        href={searchUrl}
      >
        <img src={provider.faviconUrl || url + "favicon.ico"}></img>
      </a>
    </div>
  );
};

export const OCSicon_function = ({ provider, text, closeOCS }) => {
  const theFunction = Functions[provider.name];

  const clickHandler = (e) => {
    e.preventDefault();
    theFunction(text);

    closeOCS(true);
  };

  return (
    <div className={`OCSicon ${provider.visibility}`}>
      <a onClick={clickHandler} key={provider.name}>
        <img src={chrome.runtime.getURL(provider.faviconUrl)}></img>
      </a>
    </div>
  );
};
