import { useState } from "react";
import Modal from "./Modal";

function TimedAlert(props) {
  const [isOpen, setIsOpen] = useState(props.isOpen || false);

  if (isOpen) {
    setTimeout(() => {
      setIsOpen(false);
    }, props.timeout || 5000);
  }

  return (
    <Modal
      type={"timed"}
      title={props.title}
      body={props.body}
      isOpen={isOpen}
      isModal={props.isModal || false}
      onClose={() => setIsOpen(false)}
    ></Modal>
  );
}

export default TimedAlert;
