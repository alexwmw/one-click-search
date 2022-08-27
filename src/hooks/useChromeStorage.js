import { useReducer } from "react";
import { useEffect } from "react";
import ChromeReducer from "../reducers/ChromeReducer";

const useChromeStorage = (keys) => {
  const [state, dispatch] = useReducer(ChromeReducer);

  /** On first render, get data from storage and
   * set it in state via dispatch */
  useEffect(() => {
    try {
      chrome.storage.sync.get(keys, (result) => {
        console.log("chrome holds: ", result);
        dispatch({ type: "INIT", data: result });
        console.log("state set to chrome: ", result);
      });
    } catch (err) {
      throw err;
    }
  }, []);

  /** Store state in storage whenever state changes */
  useEffect(() => {
    if (state) {
      console.log("state holds: ", state);

      chrome.storage.sync.set(state, () => {
      });
    }
  }, [state]);

  return [state, dispatch];
};

export default useChromeStorage;
