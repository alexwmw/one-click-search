import { useEffect, useState } from "react";
import useOutsideClick from "/src/hooks/useOutsideClick";
import useTimeout from "/src/hooks/useTimeout";
import styles from "./OneClickSearch.modules.less";
import "../../less/theme.less";
import { applyTheme } from "../../modules/Utilities";

const OCSPopUp = ({
  options: {
    borderRadius,
    padding,
    shadow,
    fadeDelay,
    showDelay,
    animations,
    color,
  },
  style,
  dispatch,
  showHidden,
  children,
}) => {
  const [setT_showHidden, clearT_showHidden] = useTimeout();
  const [setT_fadePopup, clearT_fadePopup] = useTimeout();
  const [theme, setTheme] = useState();

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

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

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
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ ...style, backgroundColor: `#${color.value}` }}
      className={[
        styles.popup,
        styles[`br-${borderRadius.value}`],
        styles[`pad-${padding.value}`],
        showHidden && styles.showHidden,
        shadow.value && styles.shadow,
        animations.value && styles.animations,
      ].join(" ")}
    >
      {children}
    </div>
  );
};

export default OCSPopUp;
