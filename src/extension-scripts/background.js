import OCSproviders from "../data/providers.json";
import OCSfunctions from "../data/functions.json";

// Fetch data or load defaults into storage

// Transform any existing data from old version (object) into new format (array)

const storedProviders = {};

function updateProvider(oldProvider) {
  const newProvider = {};

  newProvider.name = oldProvider.name;
  newProvider.role = "provider";
  newProvider.url = oldProvider.url
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

  return sorted.sort((a, b) => a.position - b.position).concat(unsorted);
}

const newProviders = Object.values(storedProviders)
  .filter((p) => !p.isFunc)
  .map((old) => updateProvider(old));
