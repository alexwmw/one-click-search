import { useEffect } from "react";

function useGetStorage(keys = [], handlers = [], dependencies = []) {
  const callback = (result) => {
    handlers.forEach(setState, (index) => {
      const key = keys[index];
      setState(result[key]);
    });
  };
  useEffect(() => {
    chrome.storage.sync.get(keys, callback);
  }, dependencies);
}

export default useGetStorage;
