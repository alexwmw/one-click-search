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
/** Return an array where each item with a 'position' property 
 * is at the front according to its position property */
export function sortByPosition(array) {
  const hasPosition = [];
  const noPosition = [];

  array.forEach((element) => {
    if (element.hasOwnProperty("position")) {
      hasPosition.push(element);
    } else {
      noPosition.push(element);
    }
  });
  hasPosition.sort((a, b) => a.position - b.position);
  return [...hasPosition, ...noPosition];
}

/** Helper function */
export const splitSortables = (array) => ({
  visible: array.filter((item) => item.visibility == "visible"),
  hidden: array.filter((item) => item.visibility == "hidden"),
  disabled: array.filter((item) => item.visibility == "disabled"),
});

/** Helper function */
export const mergeSortables = (sortables) => [
  ...sortables.visible,
  ...sortables.hidden,
  ...sortables.disabled,
];

/** Helper function */
export const isUpdated = (Old, New) => {
  // finished: no item in the list is 'chosen', i.e. user has finished a drag/drop
  const finished = New.every((provider) => provider.chosen !== true);
  const positionsChanged = New.some(
    (e, i, array) => array[i].name !== Old[i].name
  );
  return finished && positionsChanged;
};
