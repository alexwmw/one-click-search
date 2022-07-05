import { useEffect, useState } from "react";
import "./OneClickSearch.less";
import OCSicon from "./OCSicon";

const OneClickSearch = () => {
  /** State and local data */
  const [thisClick, setThisClick] = useState({});
  const [options, setOptions] = useState({});
  const [providers, setProviders] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const timeouts = {};

  /** useEffect on first render only
   * Get data from storage
   */
  useEffect(() => {
    chrome.storage.sync.get(
      ["providers", "options"],
      ({ providers, options }) => {
        setProviders(providers);
        setOptions(options);
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
  });

  /** Mouse events */
  const onMouseEnter = (evt) => {
    clearTimeout(timeouts.hover);
    timeouts.hover = setTimeout(() => {
      setIsHovered(true);
    }, 1000);
  };

  /** Mouse events */
  const onMouseLeave = (evt) => {
    clearTimeout(timeouts.hover);
    timeouts.hover = setTimeout(() => {
      setIsHovered(false);
    }, 2000);
  };

  /** Component lists */
  const Providers = providers.map((provider) => (
    <OCSicon key={provider.name} text={thisClick.text} provider={provider} />
  ));

  return (
    <div>
      {thisClick.text && (
        <div
          className={`OneClickSearch ${isHovered ? "isHovered" : ""}`}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={{
            left: thisClick.x,
            top: thisClick.y,
          }}
        >
          {Providers}
        </div>
      )}
    </div>
  );
};

export default OneClickSearch;
