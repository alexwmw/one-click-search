import { createContext, useReducer, useContext } from "react";

const ToastStateContext = createContext({ toasts: [] });
const ToastDispatchContext = createContext(null);

const ToastReducer = (state, action) => {
  if (action.type == "ADD_TOAST") {
    return { ...state, toasts: [...state.toasts, action.toast] };
  }
  if (action.type == "DELETE_TOAST") {
    const updatedToasts = state.toasts.filter((t) => t.id !== action.id);
    return {
      ...state,
      toasts: updatedToasts,
    };
  }
  throw new Error("ToastReducer: Action type not found");
};

export const ToastProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ToastReducer, { toasts: [] });

  return (
    <ToastStateContext.Provider value={state}>
      <ToastDispatchContext value={dispatch}>{children}</ToastDispatchContext>
    </ToastStateContext.Provider>
  );
};

export const useToastStateContext = () => useContext(ToastStateContext);
export const useToastDispatchContext = () => useContext(ToastDispatchContext);
