import { useEffect, useState } from "react";
import Transition from "react-transition-group/Transition";
import "./OneClickSearch.less";
import OCSicon from "./OCSicon";
import Inner from "./OneClickSearch_Inner";
import { isValidSelection } from "../../modules/Utilities";

const OneClickSearch = () => {
  /** State and local data */
  const [providers, setProviders] = useState([]);
  const [thisClick, setThisClick] = useState({});
  const [position, setPosition] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [fade, setFade] = useState(false);

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
      const selection = window.getSelection();
      if (!isOCS && isValidSelection(selection)) {
        const text = selection.toString();
        setThisClick({ text: text, x: evt.pageX, y: evt.pageY });
      } else {
        setIsVisible(false);
        setFade(false);
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
    setIsVisible(true);
    setFade(true);
    setPosition({ left: thisClick.x, top: thisClick.y });
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

  return (
    <div style={position} className={"OneClickSearch"}>
      <Transition in={isVisible} timeout={fade ? 3000 - 250 : 0}>
        {(state) => {
          if (state !== "exited") {
            return (
              <Inner
                style={{
                  transition:
                    state === "exiting" && fade
                      ? `opacity ${3000}ms ease-out`
                      : "",
                  opacity: state === "exiting" ? 0 : 1,
                }}
                closeOCS={closeOCS}
                setIsVisible={setIsVisible}
                thisClick={thisClick}
              >
                {providerIcons}
              </Inner>
            );
          }
        }}
      </Transition>
    </div>
  );
};

export default OneClickSearch;
