function OCSicon({ provider, text }) {
  const $TEXT$ = text;
  if (provider.role == "provider") {
    const encodedText = encodeURIComponent(text);
    const url = provider.url + provider.queryPath; //.toString().replace("$TEXT$"", $TEXT$);
    return (
      <div className={`OCS OCSicon ${provider.visibility}`}>
        <a className={"OCS"} href={url}>
          <img
            className={"OCS"}
            src={provider.faviconUrl || provider.url + "favicon.ico"}
          ></img>
        </a>
      </div>
    );
  }
  if (provider.role == "function") {
    // const clickHandler = Function(
    //   provider.function.arguments,
    //   provider.function.body
    // );

    return (
      <div
        //onClick={clickHandler}
        className={`OCS OCSicon ${provider.visibility}`}
      >
        <a className={"OCS"} key={provider.name}>
          <img
            className={"OCS"}
            src={chrome.runtime.getURL(provider.faviconUrl)}
          ></img>
        </a>
      </div>
    );
  }
}

export default OCSicon;
