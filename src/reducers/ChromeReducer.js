import { replaceObjectInArray } from "../modules/Utilities";

const ChromeReducer = (state, action) => {
  let newProviders;
  switch (action.type) {
    case "SET_PROVIDERS":
      newProviders = action.providers;
      chrome.storage.sync.set({ providers: newProviders });
      return {
        ...state,
        providers: newProviders,
      };
    case "UPDATE_PROVIDER":
      newProviders = replaceObjectInArray(state.providers, action.provider);
      chrome.storage.sync.set({ providers: newProviders });
      return {
        ...state,
        providers: newProviders,
      };
    case "DELETE_PROVIDER":
      newProviders = state.providers.filter(
        (p) => p.name !== action.provider.name
      );
      chrome.storage.sync.set({ providers: newProviders });
      return {
        ...state,
        providers: newProviders,
      };
  }
};

export default ChromeReducer;
