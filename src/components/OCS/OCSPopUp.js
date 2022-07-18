import { useEffect } from "react";
import useTimeout from "../../hooks/useTimeout";

const OCSPopUp = ({ style, dispatch, showHidden, children }) => {
  const [setT_showHidden, clearT_showHidden] = useTimeout();
  const [setT_fadePopup, clearT_fadePopup] = useTimeout();

  /** Mouse events */
  const onMouseEnter = (evt) => {
    dispatch({ type: "MOUSEENTER_POPUP" });
    clearT_fadePopup();
    setT_showHidden(() => {
      dispatch({ type: "SHOW_HIDDEN_ICONS" });
    }, 1500);
  };

  /** Mouse events */
  const onMouseLeave = (evt) => {
    setT_fadePopup(() => dispatch({ type: "FADE_POPUP" }), 3000);
    setT_showHidden(() => dispatch({ type: "HIDE_HIDDEN_ICONS" }), 1000);
  };

  /** useEffect on first render only */
  useEffect(() => {
    clearT_showHidden();
    clearT_fadePopup();
  }, []);

  return (
    <div
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
