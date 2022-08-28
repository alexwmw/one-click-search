import OCSproviders from "/src/data/providers.json";
import OCSfunctions from "/src/data/functions.json";
import { replaceObjectInArray, sortByPosition } from "./Utilities";

const ChromeDispatcher = (action) => {
  const set = (obj) => chrome.storage.sync.set(obj);
  const get = (keys, callback) => chrome.storage.sync.get(keys, callback);

  switch (action.type) {
    case "SET_PROVIDERS":
      set({
        providers: action.providers,
      });
      break;
    case "RESET_PROVIDERS":
      set({ providers: sortByPosition([...OCSproviders, ...OCSfunctions]) });
      break;
    case "UPDATE_PROVIDER":
      get(["providers"], (result) =>
        set({
          providers: replaceObjectInArray(result.providers, action.provider),
        })
      );
      break;
    case "ADD_NEW_PROVIDER":
      get(["providers"], (result) =>
        set({
          providers: [...result.providers, action.provider],
        })
      );
      break;
    case "DELETE_PROVIDER":
      get(["providers"], (result) =>
        set({
          providers: result.providers.filter(
            (p) => p.name !== action.provider.name
          ),
        })
      );
      break;
    case "UPDATE_SETTING":
      get(["options"], (result) => {
        const setting = result.options[action.settingId];
        setting.value = action.value;
        set({ options: result.options });
      });
      break;
  }
};

export default ChromeDispatcher;
