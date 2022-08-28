import { useReducer, createContext } from "react";

export function ToastsReducer(state, action) {
  switch (action.type) {
    // case "PROVIDER_SAVED":
    // case "PROVIDER_DELETED":
    // case "ORDER_SAVED":
    case "PROVIDER_ADDED":
      return [
        ...state,
        {
          icon: "checkCircle",
          title: "New provider added!",
          category: "success",
        },
      ];
    case "PROVIDERS_RESET":
      return [
        ...state,
        {
          icon: "checkCircle",
          title: "Providers reset!",
          category: "success",
        },
      ];
    case "SETTING_UPDATED":
      return [
        ...state,
        {
          icon: "checkCircle",
          title: "Changes Saved!",
          category: "success",
        },
      ];
  }
}
export const ToastsContext = createContext();
