import { sortablesFromProviders } from "../modules/Utilities";

const SortablesReducer = (state, action) => {
  switch (action.type) {
    case "SET_ALL_LISTS":
      return sortablesFromProviders(action.providers);
    case "SET_VISIBLE":
      return {
        ...state,
        visible: action.list.map((p) => ({ ...p, visibility: "visible" })),
      };
    case "SET_HIDDEN":
      return {
        ...state,
        hidden: action.list.map((p) => ({ ...p, visibility: "hidden" })),
      };
    case "SET_DISABLED":
      return {
        ...state,
        disabled: action.list.map((p) => ({ ...p, visibility: "disabled" })),
      };
  }
};

export default SortablesReducer;
