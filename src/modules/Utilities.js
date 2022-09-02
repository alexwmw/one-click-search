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
    //todo: use the validator before returning the provider
    return newProvider;
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
export const replaceObjectInArray = (array, newObject, matchKey = "name") => {
  const itemIndex = array.findIndex(
    (object) => object[matchKey] === newObject[matchKey]
  );
  if (itemIndex > -1) {
    array[itemIndex] = newObject;
    return [...array];
  } else {
    throw new ReferenceError("No match not found in array.");
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

export const isValidSelection = (selection) => {
  if (selection != "") {
    const nodeType = selection.focusNode.nodeType;
    const selectionLength = selection.toString().length;
    return nodeType == Node.TEXT_NODE && selectionLength > 0;
  }
  return false;
};
export const visible = (obj) => obj.visibility === "visible";
export const hidden = (obj) => obj.visibility === "hidden";
export const disabled = (obj) => obj.visibility === "disabled";

export const isValidText = (text) => {
  const invalidStrings = ["", " "];
  return text && text !== "" && text !== " ";
};

export const compareObjs = (
  A,
  B,
  options = { type: "same", keysOnly: false }
) => {
  let aKeys = Object.keys(A);
  let bKeys = Object.keys(B);

  if (options.keysOnly) {
    aKeys = aKeys.filter((keyInA) => bKeys.some((keyInB) => keyInB === keyInA));
    bKeys = bKeys.filter((keyInB) => aKeys.some((keyInA) => keyInA === keyInB));
  }

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  const evaluateWith = {
    same: (keys) => keys.every((key) => A[key] === B[key]),
    different: (keys) => keys.some((key) => A[key] !== B[key]),
  }[options.type];

  return evaluateWith(aKeys);
};

export const sortablesFromProviders = (providers) => {
  return {
    visible: providers.filter((p) => visible(p)),
    hidden: providers.filter((p) => hidden(p)),
    disabled: providers.filter((p) => disabled(p)),
    none: providers.filter((p) => !visible(p) && !hidden(p) && !disabled(p)),
  };
};

export const arrayFromSortables = (sortables) => {
  return sortByPosition([
    ...sortables.none,
    ...sortables.visible,
    ...sortables.hidden,
    ...sortables.disabled,
  ]);
};

export const sortIsFinished = (array) => array.every((p) => p.chosen !== true);

export const placesHaveChanged = (array, providers) =>
  array.some(
    (e, i, a) =>
      a[i].name !== providers[i].name ||
      a[i].visibility !== providers[i].visibility
  );

// export const getChangedSettings = (changes) => {
//   const changedSettings = {};
//   const { oldValue, newValue } = changes["options"] ?? {};
//   if (oldValue && newValue) {
//     for (const setting of Object.keys(newValue)) {
//       if (newValue[setting].value !== oldValue[setting].value) {
//         changedSettings[setting] = {
//           old: oldValue[setting].value,
//           new: newValue[setting].value,
//         };
//       }
//     }
//   }
//   return changedSettings;
// };

export const set = (obj, callback) =>
  chrome.storage.sync.set(obj, callback && callback());

export const get = (keys, callback) => chrome.storage.sync.get(keys, callback);

/** Style for the popup based on transition state:
 *  [entering, entered, exiting, exited] */
export const styleByState = (state, fade, fadeOutTime) => {
  const opacityValue = state === "exiting" ? 0 : 1;
  const transitionTime = fadeOutTime * 1000;
  const transitionArgs =
    state === "exiting" && fade ? `opacity ${transitionTime}ms ease-out` : "";
  return {
    opacity: opacityValue,
    transition: transitionArgs,
  };
};

export const applyTheme = (theme, element = null) => {
  const html = document.querySelector("html");
  if (element) {
    element.dataset.theme = `theme-${theme}`;
  } else {
    html.dataset.theme = `theme-${theme}`;
  }
};
