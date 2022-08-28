import OCSproviders from "/src/data/providers.json";
import OCSfunctions from "/src/data/functions.json";
import OCSoptions from "/src/data/options.json";
import { sortByPosition, adaptLegacyProvider } from "/src/modules/Utilities";
import { getChangedSettings, get, set } from "../modules/Utilities";

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
chrome.storage.sync.clear();

// Check if data exists; if not: set to defaults
get(defaults, (result) =>
  set(result, () => {
    console.log("background; Set providers to: ");
    console.log(result.providers);
    console.log("background; Set options to: ");
    console.log(result.options);
  })
);

/** Chrome listeners */
chrome.storage.onChanged.addListener((changes) =>
  getChangedSettings(changes, (changedSettings) => {
    for (const func of OCSfunctions) {
      const s = `enable${func.name}`;
      if (changedSettings[s]) {
        get(["providers"], (result) => {
          const f = result.providers.filter((p) => p.name == func.name)[0];
          f.enabled = changedSettings[s].new;
          set({ providers: result.providers }, () => {
            console.log(`set ${f.name}.enabled to ${changedSettings[s].new}`);
          });
        });
      }
    }
  })
);
