import OCSproviders from "../data/providers.json";
import OCSfunctions from "../data/functions.json";
import OCSoptions from "../data/options.json";
import { sortByPosition, adaptLegacyProvider } from "../modules/Utilities";

const defaultProviders = sortByPosition([...OCSproviders, ...OCSfunctions]);

const defaultOptions = OCSoptions;

const callback = ({ providers, options }) => {
  //const isLegacy = providers.some((provider) => provider.version !== 2);
  const isLegacy = false;
  let adaptedProviders = providers;

  if (isLegacy) {
    adaptedProviders = providers.map((provider) =>
      adaptLegacyProvider(provider)
    );
  }
  chrome.storage.sync.set({ adaptedProviders, options });
};

// chrome.storage.sync.get(
//   { providers: defaultProviders, options: defaultOptions },
//   (result) => callback(result)
// );
// chrome.storage.sync.clear();
chrome.storage.sync.get(
  { providers: defaultProviders, options: defaultOptions },
  (result) => chrome.storage.sync.set(result)
);
