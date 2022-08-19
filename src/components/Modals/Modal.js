import { useRef, useEffect } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import Button from "../Buttons/Button";
import Icon from "../Icons/Icon";
import iconMap from "../Icons/iconMap";
import "./Modal.less";

function Modal(props) {
  const {
    classes = [],
    category,
    type = "modal",
    state = "none",
    isOpen,
    title,
    body,
    onProceed = () => null,
    onClose = () => null,
    children,
    isModal = true,
    closable = false,
  } = props;

  const ref = useRef(null);
  const clickRef = isModal && useOutsideClick(onClose, ref.current);

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

  const { iconClass } = iconMap(props.icon);

  const classString = ["Modal", state, type, category, ...classes].join(" ");

  const buttonsDiv = buttons && (
    <div className="btn-area flex-container row right">{buttons}</div>
  );

  const bodyDiv = (body || children) && (
    <div className="body-area">
      {typeof body === "string" && <p>{body}</p>}
      {typeof body === "object" &&
        body.map((para, i) => {
          return <p key={i}>{para}</p>;
        })}
      {children && <div>{children}</div>}
    </div>
  );

  return (
    <>
      {isOpen && (
        <dialog className={classString} ref={ref} onCancel={onClose}>
          <div ref={clickRef}>
            <div className={"title-area flex-container row space-between"}>
              <h2>
                <div>
                  {iconClass && <Icon icon={iconClass} />}
                  <span>{title}</span>
                </div>
                <div>
                  {closable && <Icon onClick={onClose} type={"close"} />}
                </div>
              </h2>
            </div>
            {bodyDiv}
            {buttonsDiv}
          </div>
        </dialog>
      )}
    </>
  );
}

export default Modal;
