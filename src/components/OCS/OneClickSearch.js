import { useEffect, useState } from "react";
import Transition from "react-transition-group/Transition";
import "./OneClickSearch.less";
import OCSicon from "./OCSicon";
import Inner from "./OneClickSearch_Inner";
import {
  isOcsElement,
  isValidSelection,
  isValidText,
} from "../../modules/Utilities";

const OneClickSearch = () => {
  /** State and local data */
  const [providers, setProviders] = useState([]);
  const [clickProps, setClickProps] = useState({});
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
      const selection = window.getSelection();
      if (!isOcsElement(evt) && isValidSelection(selection)) {
        setClickProps({
          text: selection.toString(),
          x: evt.pageX,
          y: evt.pageY,
        });
      }
    });
  }, []);

  /** useEffect on first render only
   * Add mousedown event listener
   */
  useEffect(() => {
    document.addEventListener("mousedown", (evt) => {
      setIsVisible(isOcsElement(evt));
      setFade(isOcsElement(evt));
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
    const validity = isValidText(clickProps.text);
    setIsVisible(validity);
    setFade(validity);
    validity && setPosition({ left: clickProps.x, top: clickProps.y });
  }, [clickProps]);

  /** Action */
  const closeOCS = (removeSelection = false) => {
    setIsVisible(false);
    setFade(false);
    removeSelection && window.getSelection().removeAllRanges();
  };

  /** Component lists */
  const providerIcons = providers.map((provider) => (
    <OCSicon
      closeOCS={closeOCS}
      key={provider.name}
      text={clickProps.text}
      provider={provider}
    />
  ));

  const styleByState = (state) => ({
    transition: state === "exiting" && fade ? `opacity ${3000}ms ease-out` : "",
    opacity: state === "exiting" ? 0 : 1,
  });

  return (
    <div style={position} className={"OneClickSearch"}>
      <Transition in={isVisible} timeout={fade ? 3000 - 250 : 0}>
        {(state) =>
          state !== "exited" && (
            <Inner
              style={styleByState(state)}
              closeOCS={closeOCS}
              setIsVisible={setIsVisible}
              thisClick={clickProps}
            >
              {providerIcons}
            </Inner>
          )
        }
      </Transition>
    </div>
  );
};

export default OneClickSearch;
