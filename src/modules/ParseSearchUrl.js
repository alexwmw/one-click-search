const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

const parseSearchUrl = (searchString, removeParameters, onSuccess, onError) => {
  try {
    searchString = searchString.toLowerCase().trim();
    const searchTerm = "%24text%24";
    const hasHttp = searchString.indexOf("http") == 0;
    const hasQM = searchString.indexOf("?") > -1;
    const hasDot = searchString.indexOf(".") > -1;
    const hasSearchTerm = searchString.indexOf(searchTerm) > -1;
    const hasSpaces = searchString.indexOf(" ") > -1;
    const hasSlash = searchString.indexOf("/") > -1;

    if (!hasDot || hasSpaces || !(hasQM || hasSlash)) {
      onError(
        "The URL is either invalid or does not meet the parsers requirements. Please try a different URL or try entering the provider details manually."
      );
      return;
    }
    if (!hasSearchTerm) {
      onError(
        <>
          <p>
            The search term was not found in the string. Are you sure you
            searched for the word '$TEXT$'?{" "}
          </p>
          <p>If so, the website may not be compatible.</p>
        </>
      );
      return;
    }

    let queryString = hasQM ? searchString.split("?")[1] : "";

    const urlParts = hasQM
      ? searchString.split("?")[0].split("/")
      : searchString.split("/");

    if (hasQM && removeParameters) {
      queryString = queryString
        .split("&")
        .filter((part) => part.indexOf(searchTerm) >= 0)
        .join("&");
    }

    const hostname = urlParts[hasHttp ? 2 : 0];

    let name = hostname
      .split(".")
      .filter((word) => word.length > 3)
      .map(capitalize)
      .reverse()
      .join(" ");

    if (name == "") {
      name = capitalize(hostname.split(".")[1]);
    }

    const queryPath = [
      urlParts.slice(hasHttp ? 3 : 1).join("/"),
      hasQM ? "?" : "/",
      queryString,
    ]
      .join("")
      .replace("%24text%24", "$TEXT$");

    onSuccess(name, hostname, queryPath);
  } catch (e) {
    onError(
      "Sorry - there was an error parsing the search string. Please try adding the details manually."
    );
  }
};

export default parseSearchUrl;
