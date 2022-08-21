import { useReducer } from "react";
import { useContext } from "react";

import { createContext } from "react";
import TimedAlert from "../components/Modals/TimedAlert";

import "./ToastsContainer.less";

function ToastsReducer(state, action) {
  switch (action.type) {
    case "PROVIDER_SAVED":
    case "PROVIDER_DELETED":
    case "PROVIDER_ADDED":
    case "SETTING_SAVED":
    case "ORDER_SAVED":
    case "DEFAULT":
      return [...state, { title: "saved", category: "success" }];
  }
}

export const ToastsContext = createContext();

export const ToastsProvider = ({ children }) => {
  const [toasts, dispatchToasts] = useReducer(ToastsReducer, []);

  return (
    <ToastsContext.Provider value={{ toasts, dispatchToasts }}>
      {console.log(children)}
      {children}
    </ToastsContext.Provider>
  );
};

export const ToastsContainer = () => {
  const { toasts } = useContext(ToastsContext);
  console.log(toasts);

  return (
    <div className="toasts-container flex-container column center width-100">
      {toasts.map((props, i) => (
        <TimedAlert key={i} isOpen={true} {...props} />
      ))}
    </div>
  );
};
