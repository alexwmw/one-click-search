import { useEffect, useReducer, useState } from "react";
import Transition from "react-transition-group/Transition";
import "./OneClickSearch.less";
import OCSicon from "./OCSicon";
import PopUp from "./OCSPopUp";
import { isValidSelection, isValidText } from "../../modules/Utilities";
import OCSReducer from "../../reducers/OCSReducer";

const OneClickSearch = ({ storedProviders, storedOptions }) => {
  /** State and local data */
  const [providers, setProviders] = useState(storedProviders);
  const [options, setOptions] = useState(storedOptions);
  const [{ text, x, y, position, isVisible, showHidden, fade }, dispatch] =
    useReducer(OCSReducer, {
      isVisible: false,
      fade: false,
      isHovered: false,
    });

  const clickHandler = (evt) => {
    const selection = window.getSelection();
    const OCS = document.getElementById("OneClickSearch"); //check this, otherwise !isOCS(event.target)

    if (!OCS.contains(evt.target) && isValidSelection(selection)) {
      dispatch({
        type: "SET_CLICK_PROPERTIES",
        text: selection.toString(),
        x: evt.pageX,
        y: evt.pageY,
      });
    }
  };

  /** useEffect on first render only: Add mouseup/down event listeners to document */
  useEffect(() => document.addEventListener("mouseup", clickHandler), []);

  /** useEffect on first render only: Add chrome.storage.onChanged event listener */
  useEffect(
    () =>
      chrome.storage.onChanged.addListener((changes, namespace) => {
        "providers" in changes && setProviders(changes.providers.newValue);
        "options" in changes && setOptions(changes.options.newValue);
      }),
    []
  );

  useEffect(() => {
    const showOrHide = isValidText(text) ? "DISPLAY_OCS" : "HIDE_OCS";
    dispatch({ type: showOrHide });
  }, [text, x, y]);

  const styleByState = (state) => {
    const opac = state === "exiting" ? 0 : 1;
    const time = options.fadeOutTime.value * 1000;
    const trans =
      state === "exiting" && fade ? `opacity ${time}ms ease-out` : "";
    return {
      opacity: opac,
      transition: trans,
    };
  };

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
    <div id={"OneClickSearch"} className={"OneClickSearch"}>
      <Transition
        in={isVisible}
        timeout={fade ? options.fadeOutTime.value * 1000 - 250 : 0}
        unmountOnExit
      >
        {(state) => (
          <PopUp
            style={{ ...position, ...styleByState(state) }}
            dispatch={dispatch}
            showHidden={showHidden}
            options={options}
          >
            {providerIcons}
          </PopUp>
        )}
      </Transition>
    </div>
  );
};

export default OneClickSearch;
