import styles from "./OneClickSearch.modules.less";

const OCSProviderIcon = ({ provider, text, options, onIconClick }) => {
  // Construct URL
  const encodedText = encodeURIComponent(text);
  const url = `http://${provider.hostname}/`;
  const queryPath = provider.queryPath.replace("$TEXT$", encodedText);
  const searchUrl = url + queryPath;

  return (
    <div className={[styles.OCSicon, styles[provider.visibility]].join(" ")}>
      <a
        onClick={(e) => onIconClick()}
        target={options.blankTarget && "_blank"}
        href={searchUrl}
      >
        <img src={provider.faviconUrl || url + "favicon.ico"}></img>
      </a>
    </div>
  );
};

export default OCSProviderIcon;
