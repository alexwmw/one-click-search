import { useState } from "react";

function Popup(props) {
  const [settings, setSettings] = useState();
  const getThenSetSettings = (result) => {
    setSettings(result);
  };

  chrome.storage.sync.get("options", getThenSetSettings);

  return <p>HELLOW I AM HERE!!!!</p>;
}

export default Popup;
