const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

const parseSearchUrl = (searchString, removeParameters, onSuccess, onError) => {
  try {
    searchString = searchString.trim();
    const lowerCaseSearchString = searchString.toLowerCase();
    const encodedSearchTerm = "%24text%24";
    const plainSearchTerm = "$text$";
    const hasHttp = lowerCaseSearchString.indexOf("http") == 0;
    const hasQM = searchString.indexOf("?") > -1;
    const hasDot = searchString.indexOf(".") > -1;
    const hasSearchTerm =
      lowerCaseSearchString.indexOf(encodedSearchTerm) > -1 ||
      lowerCaseSearchString.indexOf(plainSearchTerm) > -1;
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
          <p>Otherwise, you can try adding it manually.</p>
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
        .filter(
          (part) =>
            part.toLowerCase().indexOf(encodedSearchTerm) >= 0 ||
            part.toLowerCase().indexOf(plainSearchTerm) >= 0
        )
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
      .replaceAll(/%24text%24/gi, "$TEXT$")
      .replaceAll(/\$text\$/gi, "$TEXT$");

    onSuccess(name, hostname, queryPath);
  } catch (e) {
    onError(
      "Sorry - there was an error parsing the search string. Please try adding the details manually."
    );
  }
};

export default parseSearchUrl;
