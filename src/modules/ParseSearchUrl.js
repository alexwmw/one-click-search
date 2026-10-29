const parseSearchUrl = (searchString, removeParameters, onSuccess, onError) => {
  try {
    const input = searchString.trim();
    const url = new URL(input.includes("://") ? input : `https://${input}`);
    const hostname = url.hostname;
    const queryToken = "$TEXT$";
    const hasToken = decodeURIComponent(url.href).includes(queryToken);

    if (!hostname.includes(".") || !/[/?]/.test(input)) {
      onError(
        "The URL is either invalid or does not meet the parsers requirements. Please try a different URL or try entering the provider details manually."
      );
      return;
    }
    if (!hasToken) {
      onError(
        <>
          <p>
            The search term was not found in the string. Are you sure you
            searched for the word '$TEXT$'?
          </p>
          <p>Otherwise, you can try adding it manually.</p>
        </>
      );
      return;
    }

    let name = hostname
      .replace(/^www\./, "")
      .split(".")
      .filter((part) => part.length > 3)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .reverse()
      .join(" ");
    if (!name) name = hostname.split(".")[0];

    let queryPath = `${url.pathname}${url.search}${url.hash}`;
    if (removeParameters && url.search) {
      const kept = url.search.slice(1).split("&").filter((part) =>
        decodeURIComponent(part).includes(queryToken)
      );
      queryPath = `${url.pathname}${kept.length ? `?${kept.join("&")}` : ""}${url.hash}`;
    }
    queryPath = queryPath.replace(/%24text%24/gi, queryToken);
    onSuccess(name, hostname, queryPath);
  } catch (e) {
    onError(
      "Sorry - there was an error parsing the search string. Please try adding the details manually."
    );
  }
};

export default parseSearchUrl;
