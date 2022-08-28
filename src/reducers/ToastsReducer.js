import { useReducer, createContext } from "react";

export function ToastsReducer(state, action) {
  switch (action.type) {
    case "PROVIDER_SAVED":
    case "PROVIDER_DELETED":
    case "PROVIDER_ADDED":
    case "SETTING_SAVED":
    case "ORDER_SAVED":
    case "CUSTOM_SAVED":
      return [
        ...state,
        {
          icon: "checkCircle",
          title: action.message,
          category: "success",
        },
      ];
  }
}
export const ToastsContext = createContext();
