import { disabled, hidden, visible } from "/src/modules/Utilities";

const sortablesFromProviders = (providers) => ({
  visible: providers.filter((p) => visible(p)),
  hidden: providers.filter((p) => hidden(p)),
  disabled: providers.filter((p) => disabled(p)),
  none: providers.filter((p) => !visible(p) && !hidden(p) && !disabled(p)),
});

const SortablesReducer = (state, action) => {
  switch (action.type) {
    case "SET_ALL_LISTS":
      console.log(sortablesFromProviders(action.providers));
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
