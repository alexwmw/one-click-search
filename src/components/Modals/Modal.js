import { useRef, useEffect } from "react";
import clsx from "clsx";
import useOutsideClick from "../../hooks/useOutsideClick";
import Icon from "../Icons/Icon";
import IconTrigger from "../Icons/IconTrigger";
import "./Modal.less";

function Modal(props) {
  const {
    classes = [],
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
  const clickRef = isClosable
    ? useOutsideClick(onClose, ref.current)
    : useRef(null);

  useEffect(() => {
    if (isOpen && openAsModal) {
      ref.current?.showModal();
      document.body.classList.add("modal-open");
    } else if (isOpen && !openAsModal) {
      ref.current?.show();
    } else {
      ref.current?.close();
      document.body.classList.remove("modal-open");
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
          <div ref={clickRef}>
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
