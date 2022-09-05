import { useRef, useEffect } from "react";
import clsx from "clsx";
import useOutsideClick from "../../hooks/useOutsideClick";
import Icon from "../Icons/Icon";
import IconTrigger from "../Icons/IconTrigger";
import "./Modal.less";
import "../../less/modalColors.less";

function Modal(props) {
  const {
    classes,
    isOpen,
    title,
    body,
    onClose,
    children,
    openAsModal = true,
    isClosable,
    hasTitleBar,
  } = props;

  const ref = useRef(null);
  const clickRef = useOutsideClick(onClose, ref.current);

  useEffect(() => {
    if (isOpen && openAsModal) {
      ref.current?.showModal();
      document.body.classList.add("modal-open");
    } else if (isOpen) {
      ref.current?.show();
    } else {
      ref.current?.close();
      if (document.getElementsByClassName("modal").length == 0) {
        document.body.classList.remove("modal-open");
      }
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <dialog
          className={clsx(
            "modal",
            (hasTitleBar || isClosable) && "title-bar-modal",
            classes
          )}
          ref={ref}
          onCancel={onClose}
        >
          <div ref={isClosable && clickRef}>
            <div className={"title-area flex-container row"}>
              <h2>
                <div className="modal-title">
                  {props.icon && <Icon icon={props.icon} />}
                  <span className="modal-title-text">{title}</span>
                </div>
                {isClosable && (
                  <div>
                    <IconTrigger onClick={onClose} type={"close"} />
                  </div>
                )}
              </h2>
            </div>
            {(body || children) && (
              <div className="body-area">
                {body && <p>{body}</p>}
                {children && <div>{children}</div>}
              </div>
            )}
          </div>
        </dialog>
      )}
    </>
  );
}

export default Modal;
