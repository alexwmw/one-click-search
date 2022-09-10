import { createContext } from "react";

export function ToastsReducer(state, action) {
  switch (action.type) {
    case "PROVIDER_SAVED":
      return [
        ...state,
        {
          icon: "check",
          title: "Provider details updated",
          category: "success",
        },
      ];
    case "ORDER_SAVED":
      return [
        ...state,
        {
          icon: "check",
          title: "Order saved",
          category: "success",
        },
      ];
    case "PROVIDER_ADDED":
      return [
        ...state,
        {
          icon: "check",
          title: "New provider added",
          category: "success",
        },
      ];
    case "PROVIDERS_RESET":
      return [
        ...state,
        {
          icon: "reset",
          title: "Providers reset",
          category: "success",
        },
      ];
    case "PROVIDER_DELETED":
      return [
        ...state,
        {
          icon: "delete",
          title: "Provider deleted",
          category: "danger",
        },
      ];
    case "SETTING_UPDATED":
      return [
        ...state,
        {
          icon: "check",
          title: "Change saved",
          category: "success",
        },
      ];
  }
}
export const ToastsContext = createContext();
