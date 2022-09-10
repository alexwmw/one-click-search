import { useEffect, useReducer, useState } from "react";
import clsx from "clsx";
import Transition from "react-transition-group/Transition";
import useChromeListener from "../../hooks/useChromeListener";
import OCSReducer from "../../reducers/OCSReducer";
import { isValidSelection, isValidText } from "../../modules/Utilities";
import PopUp from "./OCSPopUp";
import OCSIconMap from "./OCSIconMap";

const OneClickSearch = ({ storedProviders, storedOptions }) => {
  /** State and local data */
  const [providers, setProviders] = useState(storedProviders);
  const [options, setOptions] = useState(storedOptions);
  const [darkMode, setDarkMode] = useState(options.theme.value == "Dark");
  const [{ text, x, y, position, isVisible, showHidden, fade }, dispatch] =
    useReducer(OCSReducer, {
      isVisible: false,
      fade: false,
      isHovered: false,
    });

  /** Updated state when stored values change */
  useChromeListener(
    ({ newValue }, key) => {
      key === "providers" && setProviders(newValue);
      key === "options" && setOptions(newValue);
    },
    ["providers", "options"]
  );

  useChromeListener(
    ({ oldValue, newValue }) => {
      if (oldValue.theme !== newValue.theme) {
        setDarkMode(newValue.theme.value == "Dark");
      }
    },
    ["options"]
  );

  const clickHandler = (evt) => {
    console.log(evt);
    const selection = window.getSelection();
    const OCS = document.getElementById("OneClickSearch");
    const checks = [
      // Check the click was outside of the popup
      !OCS.contains(evt.target),
      // Check the text selection is a valid one
      isValidSelection(selection),
      // Check the maximum number of characters is unlimited or has not been exceeded
      options.maxChars.value === "0" ||
        selection.toString().length <= options.maxChars.value,
    ];

    if (checks.every((val) => val === true)) {
      dispatch({
        type: "SET_CLICK_PROPERTIES",
        text: selection.toString(),
        x: evt.pageX,
        y: evt.pageY,
      });
    }
  };

  /** Add mouseup/down event listeners to document */
  useEffect(() => {
    document.addEventListener("mouseup", clickHandler);
  }, []);

  /** When click data changes, hide or display the popup */
  useEffect(() => {
    if (isValidText(text)) {
      dispatch({ type: "DISPLAY_OCS" });
    } else {
      dispatch({ type: "HIDE_OCS" });
    }
  }, [text, x, y]);

  console.log(options.linkTarget);

  return (
    <div
      id={"OneClickSearch"}
      className={clsx("OneClickSearch", darkMode && "dark-theme")}
    >
      <Transition
        in={isVisible}
        timeout={fade ? options.fadeOutTime.value * 1000 - 250 : 0}
        unmountOnExit
      >
        {(state) => (
          <PopUp
            style={{
              ...position,
              opacity: state === "exiting" ? 0 : 1,
              transition:
                state === "exiting" && fade
                  ? `opacity ${options.fadeOutTime.value * 1000}ms ease-out`
                  : "",
            }}
            dispatch={dispatch}
            showHidden={showHidden}
            options={options}
          >
            <OCSIconMap
              providers={providers}
              text={text}
              onIconClick={() => dispatch({ type: "CLICK_OCS_ICON" })}
              linkTarget={
                options.linkTarget.dictionary[options.linkTarget.value]
              }
              allowTitles={options.allowTitles.value}
            />
          </PopUp>
        )}
      </Transition>
    </div>
  );
};

export default OneClickSearch;
