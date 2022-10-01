import OCSfunctions from "../data/functions.json";
import legacyData from "../data/legacyData.js";
import {
  sortByPosition,
  get,
  set,
  localizedOptions,
  localizedProviders,
} from "../modules/Utilities";
import { adaptLegacyObject, isLegacyData } from "../modules/AdaptLegacyData";

// Localized objects
const OCSoptions = localizedOptions();
const OCSproviders = localizedProviders();

const devConfig = {
  setLegacyData: false,
  clearStoredData: false,
  doNotFade: false,
};

const sw_log = (...args) => {
  console.log("service worker:", ...args);
};

if (devConfig.clearStoredData) {
  chrome.storage.sync.clear(() => sw_log("Storage was cleared"));

  if (devConfig.doNotFade) {
    OCSoptions.fadeDelay.value = "9999999";
  }
}

// Defaults for storage
const defaults = {
  providers: OCSproviders,
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
