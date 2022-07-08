import schema from "../data/providersSchema.json";
import isValidHostname from "is-valid-hostname";

/**  */
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
    } else {
      newProvider.faviconUrl = "";
    }

    //const validator = providerValidation(newProvider);
    //if (provider.decision === true) {
    if (true) {
      return newProvider;
    } else {
      //console.log("Adapt Legacy Provider did not work for " + oldProvider.name);
      //console.table(validator.messages);
    }
  } catch (e) {
    console.log("Adapt Legacy Provider did not work for " + oldProvider.name);
    console.table(e);
    return null;
  }
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
export const splitSortablesGeneric = (array, keys) => {
  const object = {};
  keys.forEach((key) => {
    object[key] = array.filter((item) => item.visibility == key);
  });
  return object;
};

/** Helper function */
export const updateArrayItem = (parentArray, newItem, returnNew = false) => {
  const index = parentArray.findIndex((object) => {
    return object.name === newItem.name;
  });
  parentArray[index] = newItem;
  if (returnNew) {
    return [...parentArray];
  }
};

/** Helper function */
export const removeArrayItem = (parentArray, target, returnNew = false) => {
  const index = parentArray.findIndex((object) => {
    return object.name === target.name;
  });
  parentArray.splice(index, 1);
  if (returnNew) {
    return [...parentArray];
  }
};

/** Helper function */
export const isValidURL = (url) => {
  let x = false;
  try {
    x = new URL(url);
  } catch (e) {}
  return !x === false;
};

/** Helper function */
export const providerValidation = (provider) => {
  const report = {
    name: RegExp(schema.properties.name.pattern).test(provider.name)
      ? true
      : `\"${provider.name}\" is not a valid name.`,
    role: schema.properties.role.enum.some((value) => value == provider.role)
      ? true
      : `\"${provider.role}\" is not a valid role.`,
    hostname:
      isValidHostname(provider.hostname) && provider.hostname.indexOf(".") > -1
        ? true
        : `\"${provider.hostname}\" is not a valid hostname.`,
    queryPath:
      provider.queryPath.indexOf("$TEXT$") > -1
        ? true
        : `\"${provider.queryPath}\" is not a valid query path. (Must contain \'$TEXT$\').`,
    faviconUrl:
      (provider.faviconUrl === "") | isValidURL(provider.faviconUrl)
        ? true
        : `\"${provider.faviconUrl}\" is not a valid favicon URL.`,
    visibility: schema.properties.visibility.enum.some((value) =>
      value == provider.visibility
        ? true
        : `\"${provider.visibility}\" is not a valid visibility.`
    ),
  };

  return {
    report: report,
    decision: Object.values(report).every((value) => value === true),
    messages: Object.values(report).filter((value) => value !== true),
  };
};

/** Helper function */
export const mergeSortables = (sortables) => [
  ...sortables.visible,
  ...sortables.hidden,
  ...sortables.disabled,
];

/** Helper function */
export const isUpdated = (Old, New) => {
  // finished: true if no item in the list is 'chosen', i.e. user has finished a drag/drop
  const finished = New.every((provider) => provider.chosen !== true);
  const positionsChanged = New.some(
    (e, i, array) => array[i].name !== Old[i].name
  );
  return finished && positionsChanged;
};
