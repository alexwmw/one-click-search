import { useState } from "react";

function useTimeout(timeout) {
  const [t, setState] = useState(timeout);
  const setT = (func, time) => setState(setTimeout(func, time));
  return [t, setT];
}

export default useTimeout;
