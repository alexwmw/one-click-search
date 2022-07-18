import { useEffect } from "react";

const data = { providers: {}, options: {} };

function useSetStorageEffect(object, args = []) {
  const callback = () => {
    if (args.some((arg) => arg == "log")) {
      console.log(`Stored in chrome:`);
      console.log(object);
    }
  };
  useEffect(() => {
    chrome.storage.sync.set(object, callback);
  }, Object.values(object));
}

export default useSetStorageEffect;
