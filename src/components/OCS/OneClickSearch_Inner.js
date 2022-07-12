import { useEffect, useState } from "react";
import useTimeout from "../../hooks/useTimeout";

const OneClickSearch_Inner = ({ closeOCS, setIsVisible, children }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [T_hover, setT_hover] = useTimeout();
  const [T_close, setT_close] = useTimeout();

  /** Mouse events */
  const onMouseLeaveOrMakeVisible = () => {
    clearTimeout(T_hover);
    clearTimeout(T_close);

    setT_hover(() => {
      setIsHovered(false);
    }, 1000);

    setT_close(() => {
      closeOCS();
    }, 5000);
  };

  /** Mouse events */
  const onMouseEnter = (evt) => {
    clearTimeout(T_hover);
    clearTimeout(T_close);
    setT_hover(() => {
      setIsHovered(true);
    }, 1000);
  };

  /** Mouse events */
  const onMouseLeave = (evt) => {
    onMouseLeaveOrMakeVisible();
  };

  useEffect(() => {
    onMouseLeaveOrMakeVisible();
  }, []);

  return (
    <div
      className={`inner ${isHovered ? "isHovered" : ""} ${
        isFading ? "isFading" : ""
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
};

export default OneClickSearch_Inner;
