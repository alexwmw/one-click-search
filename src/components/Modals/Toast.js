import clsx from "clsx";
import { useEffect } from "react";
import { useState } from "react";
import { Transition } from "react-transition-group";
import Modal from "./Modal";
import "./Toast.less";

function Toast(props) {
  const [transitionIn, setTransitionIn] = useState(false);
  const [done, setDone] = useState(false);
  const [timeout] = useState(props.timeout || 2000);

  const isOpen = props.isOpen ?? true;

  useEffect(() => {
    if (isOpen && !done) {
      setTransitionIn(true);
      setDone(true);
      setTimeout(() => {
        setTransitionIn(false);
      }, timeout);
    }
  });

  return (
    <Transition in={transitionIn} timeout={timeout} unmountOnExit>
      {(state) => {
        return (
          <div className={clsx("toast-wrapper", state)}>
            <Modal
              icon={props.icon}
              classes={clsx("toast", props.classes, state, props.category)}
              title={props.title}
              isOpen={isOpen}
              openAsModal={false}
            />
          </div>
        );
      }}
    </Transition>
  );
}

export default Toast;
