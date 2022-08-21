import clsx from "clsx";
import { useContext } from "react";
import { ToastsContext } from "../../reducers/ToastsReducer";
import Toast from "./Toast";

import "./ToastsContainer.less";

const ToastsContainer = (props) => {
  const { toasts } = useContext(ToastsContext);

  return (
    <div
      className={clsx(
        "toasts-container",
        "flex-container",
        "column",
        props.position ?? "center"
      )}
    >
      {toasts.map((props, i) => (
        <Toast key={i} {...props} />
      ))}
    </div>
  );
};

export default ToastsContainer;
