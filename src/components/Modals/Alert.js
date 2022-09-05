import Modal from "./Modal";
import "./Alert.less";
import { useState } from "react";
import ButtonArea from "../Buttons/ButtonArea";
import "./Alert.less";
import clsx from "clsx";
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
    <Modal
      {...props}
      classes={clsx(props.classes, "alert")}
      isOpen={isOpen}
      onClose={onClose}
    >
      {props.children}
      <ButtonArea
        onClose={() => {
          props.callback && props.callback();
          onClose();
        }}
        closeText={"OK"}
        align={"justify-center"}
      />
    </Modal>
  );
}

export default Alert;
