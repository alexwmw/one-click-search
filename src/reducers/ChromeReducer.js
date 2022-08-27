import OCSproviders from "/src/data/providers.json";
import OCSfunctions from "/src/data/functions.json";
import { replaceObjectInArray, sortByPosition } from "../modules/Utilities";

const ChromeReducer = (state, action) => {
  const metaData = { changeOrigin: action.changeOrigin };
  switch (action.type) {
    case "INIT":
      return { ...metaData, ...action.data };
    case "UPDATE":
      return { ...state, ...metaData, ...action.data };
    case "RESET_PROVIDERS":
      return {
        ...state,
        ...metaData,
        providers: sortByPosition([...OCSproviders, ...OCSfunctions]),
      };
    case "SET_PROVIDERS":
      return {
        ...state,
        ...metaData,
        providers: action.providers,
      };
    case "UPDATE_PROVIDER":
      return {
        ...state,
        ...metaData,
        providers: replaceObjectInArray(state.providers, action.provider),
      };
    case "ADD_NEW_PROVIDER":
      return {
        ...state,
        ...metaData,
        providers: [...state.providers, action.provider],
      };
    case "DELETE_PROVIDER":
      return {
        ...state,
        ...metaData,
        providers: state.providers.filter(
          (p) => p.name !== action.provider.name
        ),
      };
    case "UPDATE_SETTING":
      const setting = state.options[action.settingId];
      setting.value = action.value;
      return {
        ...state,
        ...metaData,
        options: { ...state.options },
      };
  }
};

export default ChromeReducer;
