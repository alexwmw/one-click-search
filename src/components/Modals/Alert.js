import Modal from "./Modal";
import "./Alert.less";
import { useState } from "react";

function Alert(props) {
  let isOpen, setIsOpen, onClose;

  if (!props.hasOwnProperty("isOpen")) {
    [isOpen, setIsOpen] = useState(true);
    onClose = () => setIsOpen(false);
  } else {
    isOpen = props.isOpen;
    onClose = props.onClose;
  }

  return (
    <Modal {...props} type={"alert"} isOpen={isOpen} onClose={onClose}>
      {props.children}
    </Modal>
  );
}

export default Alert;
