import OCSproviders from "/src/data/providers.json";
import OCSfunctions from "/src/data/functions.json";
import OCSoptions from "/src/data/options.json";
import { sortByPosition, adaptLegacyProvider } from "/src/modules/Utilities";

const defaultProviders = sortByPosition([...OCSproviders, ...OCSfunctions]);

const defaultOptions = OCSoptions;

const adaptForLegacy = ({ providers, options }, callback) => {
  //const isLegacy = providers.some((provider) => provider.version !== 2);
  const isLegacy = false;
  let adaptedProviders = providers;

  if (isLegacy) {
    adaptedProviders = providers.map((provider) =>
      adaptLegacyProvider(provider)
    );
  }
  callback({ adaptedProviders, options });
};

//todo: adapt for legacy
// chrome.storage.sync.get(
//   { providers: defaultProviders, options: defaultOptions },
//   (result) =>
//     adaptForLegacy(result, (result) => {
//       chrome.storage.sync.set(result);
//     })
// );
chrome.storage.sync.clear();
chrome.storage.sync.get(
  { providers: defaultProviders, options: defaultOptions },
  (result) =>
    chrome.storage.sync.set(result, () => {
      console.log("Set providers in bg: " + result.providers);
      console.log("Set options in bg: " + result.options);
      console.table(result.providers);
    })
);
