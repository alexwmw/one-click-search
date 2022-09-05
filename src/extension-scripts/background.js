import OCSproviders from "/src/data/providers.json";
import OCSfunctions from "/src/data/functions.json";
import OCSoptions from "/src/data/options.json";
import { sortByPosition } from "../modules/Utilities";
import { get, set } from "../modules/Utilities";
import legacyData from "../data/legacyData.js";
import { adaptLegacyObject, isLegacyData } from "../modules/AdaptLegacyData";

const devConfig = {
  setLegacy: false,
  clear: true,
};

const sw_log = (...args) => {
  console.log("service worker:", ...args);
};

// Defaults for storage
const defaults = {
  providers: sortByPosition([...OCSproviders, ...OCSfunctions]),
  options: OCSoptions,
};

if (devConfig.clear) {
  chrome.storage.sync.clear(() => sw_log("Storage was cleared"));
}

if (devConfig.setLegacy) {
  set(legacyData, () => sw_log("Storage was set to legacyData"));
} else {
  // Check data in storage
  get(defaults, (result) => {
    // If data existed in storage, stored data is returned.
    // If no data existed, defaults are returned

    let dataToStore = result;

    // Check is the data is legacy data and needs to be converted
    const isLegacy = isLegacyData(result);

    if (isLegacy) {
      const newProvidersArray =
        adaptLegacyObject(result.providers) ?? OCSproviders; // Will use defaults if adaptation fails

      dataToStore = {
        providers: sortByPosition([...newProvidersArray, ...OCSfunctions]),
        options: OCSoptions,
      };
    }

    set(dataToStore, () => {
      sw_log("This object was set in storage:\n", dataToStore);
    });
  });
}
