import { useRef, useEffect, useState } from "react";
import Button from "../Buttons/Button";

function Modal(props) {
  const {
    type = "alert",
    isOpen,
    title,
    body,
    onProceed = () => null,
    onClose = () => null,
    children,
    isModal = true,
  } = props;

  const ref = useRef(null);

  useEffect(() => {
    if (isOpen && isModal) {
      ref.current?.showModal();
      document.body.classList.add("modal-open");
    } else if (isOpen && !isModal) {
      ref.current?.show();
    } else {
      ref.current?.close();
      document.body.classList.remove("modal-open");
    }
  }, [isOpen]);

  const proceedAndClose = () => {
    onProceed() && onClose();
  };

  const closeBtn = (label) => <Button onClick={onClose}>{label}</Button>;
  const proceedBtn = (label) => (
    <Button onClick={proceedAndClose}>{label}</Button>
  );

  const buttons = {
    timed: <></>,
    alert: <>{closeBtn("OK")}</>,
    confirm: (
      <>
        {closeBtn("Cancel")}
        {proceedBtn("OK")}
      </>
    ),
    form: (
      <>
        {closeBtn("Cancel")}
        {proceedBtn("Submit")}
      </>
    ),
  }[type];

  return (
    <dialog ref={ref} onCancel={onClose}>
      <div className={"title-area"}>
        <h2>{title}</h2>
      </div>
      <div className="body-area">
        <p>{body}</p>
        <div>{children}</div>
      </div>
      <div className="btn-area flex-container row right">{buttons}</div>
    </dialog>
  );
}

export default Modal;
