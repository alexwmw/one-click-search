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
export const updateArrayItem = (arrayToUpdate, newItem) => {
  const index = arrayToUpdate.findIndex((object) => {
    return object.name === newItem.name;
  });
  arrayToUpdate[index] = newItem;

  return [...arrayToUpdate];
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
export const providerValidation = (provider, providers = null) => {
  const nameExists =
    providers &&
    providers.some((p) => p.name.toLowerCase() == provider.name.toLowerCase());

  const validName = RegExp(schema.properties.name.pattern).test(provider.name);
  // !nameExists && RegExp(schema.properties.name.pattern).test(provider.name);

  const validRole = schema.properties.role.enum.some(
    (value) => value == provider.role
  );

  const validHostname =
    isValidHostname(provider.hostname) && provider.hostname.indexOf(".") > -1;

  const validQueryPath = provider.queryPath.indexOf("$TEXT$") > -1;

  const validFaviconUrl =
    provider.faviconUrl === "" || isValidURL(provider.faviconUrl);

  const validVisibility = schema.properties.visibility.enum.some(
    (value) => value == provider.visibility
  );

  const report = {
    name:
      validName ||
      `\"${provider.name}\" is not a valid name.${
        nameExists && ` Name already exists. Please use a unique name.`
      }`,
    role: validRole || `\"${provider.role}\" is not a valid role.`,
    hostname:
      validHostname || `\"${provider.hostname}\" is not a valid hostname.`,
    queryPath:
      validQueryPath ||
      `\"${provider.queryPath}\" is not a valid query path. (Must contain \'$TEXT$\').`,
    faviconUrl:
      validFaviconUrl ||
      `\"${provider.faviconUrl}\" is not a valid favicon URL.`,
    visibility:
      validVisibility ||
      `\"${provider.visibility}\" is not a valid visibility.`,
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

export const isValidSelection = (selection) => {
  if (selection != "") {
    const nodeType = selection.focusNode.nodeType;
    const selectionLength = selection.toString().length;
    return nodeType == Node.TEXT_NODE && selectionLength > 0;
  }
  return false;
};
