import { useEffect } from "react";

const useChromeListener = (callback, keyArray) => {
  /** Add chrome listener to listen for changes in storage */
  useEffect(
    () =>
      chrome.storage.onChanged.addListener((changes, namespace) => {
        keyArray.forEach((key) => {
          if (
            changes[key] !== undefined &&
            Object.keys(changes[key].newValue ?? {}).length !== 0 &&
            Object.keys(changes[key].oldValue ?? {}).length !== 0
          ) {
            /** callback is called for each key.
             * changes: an object with oldValue and
             * newValue properties, representing changes
             * to the value of key */
            callback(changes[key], key);
          }
        });
      }),
    []
  );
};

export default useChromeListener;
