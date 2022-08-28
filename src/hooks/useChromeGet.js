import { useEffect } from "react";

const useChromeGet = (callback, keys) => {
  useEffect(() => {
    chrome.storage.sync.get(keys, (result) => {
      callback(result);
    });
  }, []);
};

export default useChromeGet;
