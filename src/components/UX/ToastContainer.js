import Toast from "./Toast";
import { useToastStateContext } from "./contexts/ToastsContext";

import "../../less/flex.less";
import "./ToastContainer.less";

function ToastContainer(props) {
  const { toasts } = useToastStateContext();
  // const toasts = [{ id: "x", type: "notification", message: "Saved!" }];
  return (
    <div className="flex-container column center flex-start fixed-toast">
      {toasts &&
        toasts.map((t) => (
          <Toast id={t.id} key={t.id} type={t.type} message={t.message} />
        ))}
    </div>
  );
}

export default ToastContainer;
