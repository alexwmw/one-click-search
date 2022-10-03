import { useEffect, useReducer, useState } from "react";
import clsx from "clsx";
import Transition from "react-transition-group/Transition";
import OCSPopUp from "./OCSPopUp";
import OCSIconMap from "./OCSIconMap";
import OCSReducer from "../../reducers/OCSReducer";
import OCSPageClick from "../../modules/OCSPageClick";
import useChromeListener from "../../hooks/useChromeListener";
import { isValidText } from "../../modules/Utilities";

const OneClickSearch = ({ storedProviders, storedOptions }) => {
  const [providers, setProviders] = useState(storedProviders);
  const [options, setOptions] = useState(storedOptions);

  const [{ text, position, isVisible, showHidden, fade }, dispatch] =
    useReducer(OCSReducer, {});

  const iconMapLinkTarget =
    options.linkTarget.dictionary[options.linkTarget.value];

  const iconMapAllowTitles = options.allowTitles.value;

  const transitionTimeout = fade ? options.fadeOutTime.value * 1000 - 250 : 0;


  const styleByTransitionState = (tState) => ({
    ...position,
    opacity: tState === "exiting" ? 0 : 1,
    transition:
      tState === "exiting" && fade
        ? `opacity ${options.fadeOutTime.value * 1000}ms ease-out`
        : "",
  });

  const pageClickHandler = (evt) =>
    OCSPageClick(evt, options.maxChars.value, (selectionText) =>
      dispatch({
        type: "SET_CLICK_PROPERTIES",
        text: selectionText,
        x: evt.pageX,
        y: evt.pageY,
      })
    );

  const iconClickHandler = () => {
    dispatch({ type: "CLICK_OCS_ICON" });
  };

  /** Add mouseup/down event listeners to document */
  useEffect(() => {
    document.addEventListener("click", pageClickHandler);
  }, []);

  /** When click data changes, hide or display the popup */
  useEffect(() => {
    if (isValidText(text)) {
      dispatch({ type: "DISPLAY_OCS" });
    } else {
      dispatch({ type: "HIDE_OCS" });
    }
  }, [text]);

  /** Update state when stored values change */
  useChromeListener(
    ({ newValue }, key) => {
      key === "providers" && setProviders(newValue);
      key === "options" && setOptions(newValue);
    },
    ["providers", "options"]
  );

  return (
    <div id={"OneClickSearch"} className={clsx("OneClickSearch")}>
      <Transition in={isVisible} timeout={transitionTimeout} unmountOnExit>
        {(state) => {
          return (
            <OCSPopUp
              style={styleByTransitionState(state)}
              dispatch={dispatch}
              showHidden={showHidden}
              options={options}
            >
              <OCSIconMap
                providers={providers}
                text={text}
                onIconClick={iconClickHandler}
                linkTarget={iconMapLinkTarget}
                allowTitles={iconMapAllowTitles}
              />
            </OCSPopUp>
          );
        }}
      </Transition>
    </div>
  );
};

export default OneClickSearch;
