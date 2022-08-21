import { useReducer, createContext } from "react";

function ToastsReducer(state, action) {
  switch (action.type) {
    case "PROVIDER_SAVED":
    case "PROVIDER_DELETED":
    case "PROVIDER_ADDED":
    case "SETTING_SAVED":
    case "ORDER_SAVED":
    case "DEFAULT":
      return [
        ...state,
        {
          icon: "check",
          title: "Changes saved",
          category: "success",
        },
      ];
  }
}

export const ToastsContext = createContext();

export const ToastsProvider = ({ children }) => {
  const [toasts, dispatchToasts] = useReducer(ToastsReducer, []);

  return (
    <ToastsContext.Provider value={{ toasts, dispatchToasts }}>
      {children}
    </ToastsContext.Provider>
  );
};
