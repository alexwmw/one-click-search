import OCSproviders from "../data/providers.json";
import OCSfunctions from "../data/functions.json";
import OCSoptions from "../data/options.json";
import {
  sortByPosition,
  get,
  set,
  replaceObjectInArray,
  getFromArray,
} from "../modules/Utilities";
import legacyData from "../data/legacyData.js";
import { adaptLegacyObject, isLegacyData } from "../modules/AdaptLegacyData";

const devConfig = {
  setLegacyData: false,
  clearStoredData: true,
};

const sw_log = (...args) => {
  console.log("service worker:", ...args);
};

if (devConfig.clearStoredData) {
  chrome.storage.sync.clear(() => sw_log("Storage was cleared"));
}

// Localize strings
OCSoptions.color.label = `Popup ${chrome.i18n.getMessage("color")}`;
OCSoptions.color.description = `${chrome.i18n.getMessage(
  "ColorCaps"
)} of the popup`;
OCSproviders = replaceObjectInArray(OCSproviders, {
  ...getFromArray(OCSproviders, "Amazon"),
  hostname: chrome.i18n.getMessage("amazonUrl"),
});

// Defaults for storage
const defaults = {
  providers: sortByPosition([...OCSproviders, ...OCSfunctions]),
  options: OCSoptions,
};

if (devConfig.setLegacyData) {
  set(legacyData, () => sw_log("Storage was set to legacyData"));
} else {
  // Check data in storage
  get(defaults, (result) => {
    // If data existed in storage, stored data is returned.
    // If no data existed, defaults are returned

    let dataToStore;

    // Check if the data is legacy data and needs to be converted
    const isLegacy = isLegacyData(result);

    if (isLegacy) {
      const newProvidersArray =
        adaptLegacyObject(result.providers) ?? OCSproviders; // Will use defaults if adaptation fails

      dataToStore = {
        providers: sortByPosition([...newProvidersArray, ...OCSfunctions]),
        options: OCSoptions,
      };
    } else {
      dataToStore = result;
    }

    set(dataToStore, () => {
      sw_log("This object was set in storage:\n", dataToStore);
    });
  });
}
