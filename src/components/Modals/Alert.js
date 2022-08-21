import Modal from "./Modal";
import "./Alert.less";
import { useState } from "react";
import ButtonArea from "../Buttons/ButtonArea";

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
    <Modal {...props} isOpen={isOpen} onClose={onClose}>
      {props.children}
      <ButtonArea onClose={onClose} closeText={"OK"} />
    </Modal>
  );
}

export default Alert;
