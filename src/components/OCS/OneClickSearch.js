import { useEffect, useState } from "react";
import "./OneClickSearch.less";
import OCSicon from "./OCSicon";
import Inner from "./OneClickSearch_Inner";

const OneClickSearch = () => {
  /** State and local data */
  const [providers, setProviders] = useState([]);
  const [thisClick, setThisClick] = useState({});
  const [style, setStyle] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  /** useEffect on first render only
   * Get data from storage
   */
  useEffect(() => {
    chrome.storage.sync.get(
      ["providers", "options"],
      ({ providers, options }) => {
        setProviders(providers);
        //setOptions(options);
      }
    );
  }, []);

  /** useEffect on first render only
   * Add mouseup event listener
   */
  useEffect(() => {
    document.addEventListener("mouseup", (evt) => {
      const isOCS = evt.target.closest(".OneClickSearch") !== null;
      const text = window.getSelection().toString();
      if (!isOCS) {
        setThisClick({ text: text, x: evt.pageX, y: evt.pageY });
      }
    });
  }, []);

  /** useEffect on first render only
   * Add chrome.storage.onChanged event listener
   */
  useEffect(() => {
    chrome.storage.onChanged.addListener((changes, namespace) => {
      if ("providers" in changes) {
        setProviders(changes.providers.newValue);
      }
      if ("options" in changes) {
        setOptions(changes.options.newValue);
      }
    });
  }, []);

  useEffect(() => {
    if (thisClick.text) {
      setIsVisible(true);
      setStyle({ left: thisClick.x, top: thisClick.y });
    } else {
      setIsVisible(false);
    }
  }, [thisClick]);

  /** Action */
  const closeOCS = (removeSelection = false) => {
    setIsVisible(false);
    if (removeSelection) {
      window.getSelection().removeAllRanges();
    }
  };

  /** Component lists */
  const providerIcons = providers.map((provider) => (
    <OCSicon
      closeOCS={closeOCS}
      key={provider.name}
      text={thisClick.text}
      provider={provider}
    />
  ));

  useEffect;

  return (
    <div style={style} className={"OneClickSearch"}>
      {isVisible && (
        <Inner
          closeOCS={closeOCS}
          setIsVisible={setIsVisible}
          thisClick={thisClick}
        >
          {providerIcons}
        </Inner>
      )}
    </div>
  );
};

export default OneClickSearch;
