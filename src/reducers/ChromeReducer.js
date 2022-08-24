import { replaceObjectInArray } from "../modules/Utilities";

const ChromeReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_PROVIDER":
      return {
        ...state,
        providers: replaceObjectInArray(state.providers, action.provider),
      };
    case "DELETE_PROVIDER":
      return {
        ...state,
        providers: state.providers.filter(
          (p) => p.name !== action.provider.name
        ),
      };
  }
};

export default ChromeReducer;
