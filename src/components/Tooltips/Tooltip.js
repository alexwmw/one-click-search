import { Transition } from "react-transition-group";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import clsx from "clsx";
import Icon from "../Icons/Icon";
import "./Tooltip.less";

const Tooltip = ({ text }) => {
  const [isVisible, setIsVisible] = useState(false);

  const duration = 200;

  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
  };

  const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0, display: "none" },
  };

  return (
    <>
      <div
        className="tooltip-icon-container"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        <Icon icon={faInfoCircle} />
      </div>

      <div className="tooltip-wrapper">
        <Transition in={isVisible} timeout={200 + duration}>
          {(state) => (
            <div
              style={{
                ...defaultStyle,
                ...transitionStyles[state],
              }}
              className={clsx("tooltip")}
            >
              <p>{text}</p>
            </div>
          )}
        </Transition>
      </div>
    </>
  );
};

export default Tooltip;
