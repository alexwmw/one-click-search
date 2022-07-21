import { useEffect, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import useTimeout from "../../hooks/useTimeout";

const OCSPopUp = ({
  options: { borderRadius, padding, shadow, fadeDelay, showDelay, animations },
  style,
  dispatch,
  showHidden,
  children,
}) => {
  const [setT_showHidden, clearT_showHidden] = useTimeout();
  const [setT_fadePopup, clearT_fadePopup] = useTimeout();

  /** Mouse events */
  const ref = useOutsideClick(() => dispatch({ type: "CLICK_OFF_OCS" }));

  /** Mouse events */
  const onMouseEnter = (evt) => {
    dispatch({ type: "MOUSEENTER_POPUP" });
    clearT_fadePopup();
    setT_showHidden(() => {
      dispatch({ type: "SHOW_HIDDEN_ICONS" });
    }, showDelay.value * 1000);
  };

  /** Mouse events */
  const onMouseLeave = (evt) => {
    setT_fadePopup(
      () => dispatch({ type: "FADE_POPUP" }),
      fadeDelay.value * 1000
    );
    setT_showHidden(
      () => dispatch({ type: "HIDE_HIDDEN_ICONS" }),
      showDelay.value * 1000
    );
  };

  /** useEffect on first render only */
  useEffect(
    () =>
      setT_fadePopup(
        () => dispatch({ type: "FADE_POPUP" }),
        fadeDelay.value * 1000
      ),
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
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`popup br-${borderRadius.value} pad-${padding.value} ${
        showHidden ? "showHidden" : ""
      } ${shadow.value ? "shadow" : ""} ${
        animations.value ? "animations" : ""
      }`}
    >
      {children}
    </div>
  );
};

export default OCSPopUp;
