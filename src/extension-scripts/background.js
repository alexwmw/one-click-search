import OCSproviders from "../data/providers.json";
import OCSfunctions from "../data/functions.json";
import OCSoptions from "../data/options.json";

function updateProvider(oldProvider) {
  const newProvider = {};

  newProvider.name = oldProvider.name;
  newProvider.role = "provider";
  newProvider.hostname = oldProvider.url
    .replace(/http:\/\/|https:\/\//, "")
    .replace(/\//, "");
  newProvider.queryPath = oldProvider.queryKey + "$TEXT$";
  newProvider.visibility = oldProvider.visibility;

  if (oldProvider.faviconUrl) {
    newProvider.faviconUrl = oldProvider.faviconUrl;
  }

  return newProvider;
}

function sortAndConcat(array) {
  // Reorder based on position
  const sorted = [],
    unsorted = [];

  array.forEach((element) => {
    if (element.hasOwnProperty("position")) {
      sorted.push(element);
    } else unsorted.push(element);
  });

  sorted.sort((a, b) => a.position - b.position);

  return [...sorted, ...unsorted];
}

// const newProviders = Object.values(defaultProviders)
//   .filter((p) => !p.isFunc)
//   .map((old) => updateProvider(old));

// Get or set

const defaultProviders = sortAndConcat([...OCSproviders, ...OCSfunctions]);
const defaultOptions = OCSoptions;

chrome.storage.sync.clear();

chrome.storage.sync.get(
  { providers: defaultProviders, options: defaultOptions },
  (result) => {}
);
