import { useEffect } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import useTimeout from "../../hooks/useTimeout";

const OCSPopUp = ({ style, dispatch, showHidden, children }) => {
  const [setT_showHidden, clearT_showHidden] = useTimeout();
  const [setT_fadePopup, clearT_fadePopup] = useTimeout();

  
  // Replace with options
  const fadeOutDelay = 3000;
  const hoverDelay = 1000;
  
  /** Mouse events */
  const ref = useOutsideClick(() => dispatch({ type: "CLICK_OFF_OCS" }));
  
  /** Mouse events */
  const onMouseEnter = (evt) => {
    dispatch({ type: "MOUSEENTER_POPUP" });
    clearT_fadePopup();
    setT_showHidden(() => {
      dispatch({ type: "SHOW_HIDDEN_ICONS" });
    }, hoverDelay);
  };
  
  /** Mouse events */
  const onMouseLeave = (evt) => {
    setT_fadePopup(() => dispatch({ type: "FADE_POPUP" }), fadeOutDelay);
    setT_showHidden(() => dispatch({ type: "HIDE_HIDDEN_ICONS" }), hoverDelay);
  };

  /** useEffect on first render only */
  useEffect(
    () => setT_fadePopup(() => dispatch({ type: "FADE_POPUP" }), fadeOutDelay),
    []
  );

  /** useEffect on unmount only */
  useEffect(
    () => () => {
      dispatch({ type: "HIDE_HIDDEN_ICONS" });
      clearT_showHidden();
      clearT_fadePopup();
    },
    []
  );

  return (
    <div
      ref={ref}
      style={style}
      className={`popup ${showHidden ? "showHidden" : ""}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
};

export default OCSPopUp;
