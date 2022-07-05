export function adaptLegacyProvider(oldProvider) {
  const newProvider = {};

  try {
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
  } catch (e) {
    console.log("Adapt Legacy Provider did not work for " + oldProvider.name);
    console.table(e);
  }

  return oldProvider;
}

export function sortByPosition(array) {
  // Reorder based on position
  const sorted = [];
  const unsorted = [];

  array.forEach((element) => {
    if (element.hasOwnProperty("position")) {
      sorted.push(element);
    } else {
      unsorted.push(element);
    }
  });
  sorted.sort((a, b) => a.position - b.position);
  return [...sorted, ...unsorted];
}
