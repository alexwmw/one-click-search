import "../../less/flex.less";
import "./Toast.less";

function Toast({ id, type, message }) {
  return (
    <div className="toast flex-container space-around center">
      {/* <p>{icon}</p> */}
      <p>{message}</p>
      {/* <button>{icons}</button> */}
    </div>
  );
}

export default Toast;
