import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useEffect } from "react";
import Button from "../Buttons/Button";
import "./Modal.less";

function Modal(props) {
  const {
    classes = [],
    category,
    type = "modal",
    state = "none",
    isOpen,
    icon,
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

  const buttons =
    {
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
    }[type] || null;

  return (
    <>
      {isOpen && (
        <dialog
          className={[
            "Modal",
            isModal ? "modal" : "",
            state,
            type,
            category,
            ...classes,
          ].join(" ")}
          ref={ref}
          onCancel={onClose}
        >
          <div className={"title-area"}>
            <h2>
              {icon && (
                <span className="icon">
                  <FontAwesomeIcon icon={icon} />
                </span>
              )}
              {title}
            </h2>
          </div>
          {(body || children) && (
            <div className="body-area">
              {typeof body === "string" && <p>{body}</p>}
              {typeof body === "object" &&
                body.map((para, i) => <p key={i}>{para}</p>)}
              {children && <div>{children}</div>}
            </div>
          )}
          {buttons && (
            <div className="btn-area flex-container row right">{buttons}</div>
          )}
        </dialog>
      )}
    </>
  );
}

export default Modal;
