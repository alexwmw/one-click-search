import { useEffect, useState } from "react";
import useTimeout from "../../hooks/useTimeout";

const OneClickSearch_Inner = ({ setIsVisible, style, fade, children }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showHidden, setShowHidden] = useState(false);
  const [setT_showHidden, clearT_showHidden] = useTimeout();
  const [setT_visible, clearT_visible] = useTimeout();

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
    const delay = isHovered ? 0 : 3000;
    setT_visible(() => setIsVisible(isHovered), delay);
  }, [isHovered]);

  useEffect(() => {
    const delay = isHovered ? 1500 : 1000;
    setT_showHidden(() => {
      setShowHidden(isHovered);
    }, delay);
  }, [isHovered]);

  useEffect(() => {
    setT_visible(() => setIsVisible(false), 3000);
    return () => {
      clearT_visible();
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
