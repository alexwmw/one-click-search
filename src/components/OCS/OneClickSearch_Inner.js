import { useEffect, useState } from "react";
import useTimeout from "../../hooks/useTimeout";

const OneClickSearch_Inner = ({ setIsVisible, style, fade, children }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showHidden, setShowHidden] = useState(false);
  const [setT_showHidden, clearT_showHidden] = useTimeout();
  const [setT_close, clearT_close] = useTimeout();

  /** Mouse events */

  /** Mouse events */
  const onMouseEnter = (evt) => {
    setIsHovered(true);
  };

  /** Mouse events */
  const onMouseLeave = (evt) => {
    setIsHovered(false);
  };

  useEffect(() => {
    if (isHovered === true) {
      setT_close(() => setIsVisible(true), 0);
      setT_showHidden(() => {
        setShowHidden(true);
      }, 1500);
    } else {
      setT_close(() => setIsVisible(false), 3000);
      setT_showHidden(() => {
        setShowHidden(false);
      }, 1000);
    }
  }, [isHovered]);

  useEffect(() => {
    setT_close(() => setIsVisible(false), 3000);
    return () => {
      clearT_close();
      clearT_showHidden();
    };
  }, []);

  return (
    <div
      style={style}
      className={`inner ${showHidden ? "showHidden" : ""}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
};

export default OneClickSearch_Inner;
