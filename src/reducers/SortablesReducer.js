const SortablesReducer = (state, action) => {
  switch (action.type) {
    case "SET_ALL_LISTS":
      return {
        ...state,
        visible: action.providers.filter((p) => p.visibility == "visible"),
        hidden: action.providers.filter((p) => p.visibility == "hidden"),
        disabled: action.providers.filter((p) => p.visibility == "disabled"),
        none: action.providers.filter((p) =>
          ["visible", "hidden", "disabled"].every((str) => str !== p.visibility)
        ),
      };
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
