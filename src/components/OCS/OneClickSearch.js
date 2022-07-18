import { useEffect, useReducer, useState } from "react";
import Transition from "react-transition-group/Transition";
import "./OneClickSearch.less";
import OCSicon from "./OCSicon";
import PopUp from "./OCSPopUp";
import {
  isOcsElement,
  isValidSelection,
  isValidText,
} from "../../modules/Utilities";
import OCSReducer from "../../reducers/OCSReducer";

const OneClickSearch = ({ storedProviders, storedOptions }) => {
  /** State and local data */
  const [providers, setProviders] = useState(storedProviders);
  const [options, setOptions] = useState(storedProviders);
  const [{ text, x, y, position, isVisible, showHidden, fade }, dispatch] =
    useReducer(OCSReducer, {
      isVisible: false,
      fade: false,
      isHovered: false,
    });

  const setClickProperties = (evt) => {
    const selection = window.getSelection();
    if (!isOcsElement(evt) && isValidSelection(selection)) {
      dispatch({
        type: "SET_CLICK_PROPERTIES",
        text: selection.toString(),
        x: evt.pageX,
        y: evt.pageY,
      });
    }
  };

  /** useEffect on first render only: Add mouseup/down event listeners to document */
  useEffect(() => document.addEventListener("mouseup", setClickProperties), []);

  /** useEffect on first render only: Add chrome.storage.onChanged event listener */
  useEffect(
    () =>
      chrome.storage.onChanged.addListener((changes, namespace) => {
        if ("providers" in changes) {
          setProviders(changes.providers.newValue);
        }
        if ("options" in changes) {
          setOptions(changes.options.newValue);
        }
      }),
    []
  );

  useEffect(
    () => dispatch({ type: isValidText(text) ? "DISPLAY_OCS" : "HIDE_OCS" }),
    [text, x, y]
  );

  const styleByState = (state) => ({
    transition: state === "exiting" && fade ? `opacity ${3000}ms ease-out` : "",
    opacity: state === "exiting" ? 0 : 1,
  });

  /** Component lists */
  const providerIcons = providers.map((provider) => (
    <OCSicon
      onIconClick={() => dispatch({ type: "CLICK_OCS_ICON" })}
      key={provider.name}
      text={text}
      provider={provider}
      visibility={provider.visibility}
    />
  ));

  return (
    <div className={"OneClickSearch"}>
      <Transition in={isVisible} timeout={fade ? 3000 - 250 : 0} unmountOnExit>
        {(state) => (
          <PopUp
            style={{ ...position, ...styleByState(state) }}
            dispatch={dispatch}
            showHidden={showHidden}
          >
            {providerIcons}
          </PopUp>
        )}
      </Transition>
    </div>
  );
};

export default OneClickSearch;
