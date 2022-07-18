import { useState } from "react";

function useTimeout(timeout) {
  const [state, setState] = useState(timeout);
  const clearT = () =>
    setState((T) => {
      clearTimeout(T);
      return T;
    });
  const setT = (func, time) =>
    setState((T) => {
      clearTimeout(T);
      T = setTimeout(func, time);
      return T;
    });

  return [setT, clearT];
}

export default useTimeout;
