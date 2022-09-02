import OCSproviders from "/src/data/providers.json";
import OCSfunctions from "/src/data/functions.json";
import OCSoptions from "/src/data/options.json";
import { sortByPosition, adaptLegacyProvider } from "/src/modules/Utilities";
import { get, set } from "../modules/Utilities";

const sw_log = (...args) => {
  console.log("service worker:", ...args);
};

// Defaults for storage
const defaults = {
  providers: sortByPosition([...OCSproviders, ...OCSfunctions]),
  options: OCSoptions,
};

//todo: adapt for legacy
// get(
//   { providers: defaultProviders, options: defaultOptions },
//   (result) =>
//     adaptForLegacy(result, set);
//     })
// );

// clear during dev
chrome.storage.sync.clear(() => sw_log("Storage was cleared"));

// Check if data exists; if not: set to defaults
get(defaults, (result) =>
  set(result, () => {
    sw_log("This object was set in storage:\n", result);
  })
);
