import { useState } from "react";
import Modal from "./Modal";

function Alert(props) {
  const [isOpen, setIsOpen] = useState(props.isOpen || false);

  return (
    <Modal
      type={"alert"}
      title={props.title}
      body={props.body}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    ></Modal>
  );
}

export default Alert;
