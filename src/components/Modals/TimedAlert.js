import { useEffect } from "react";
import { useState } from "react";
import { Transition } from "react-transition-group";
import Modal from "./Modal";
import "./TimedAlert.less";

function TimedAlert(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [done, setDone] = useState(false);

  const [timeout] = useState(props.timeout || 3000);

  useEffect(() => {
    if (props.isOpen && !done) {
      setIsOpen(true);
      setDone(true);
      setTimeout(() => {
        setIsOpen(false);
      }, timeout);
    }
  });

  return (
    <Transition in={isOpen} timeout={timeout} unmountOnExit>
      {(state) => {
        console.log(state);

        return (
          <Modal
            icon={props.icon}
            category={props.category}
            state={state}
            classes={props.classes}
            type={"timed"}
            title={props.title}
            isOpen={props.isOpen}
            isModal={false}
          />
        );
      }}
    </Transition>
  );
}

export default TimedAlert;
