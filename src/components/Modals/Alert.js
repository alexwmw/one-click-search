import Modal from "./Modal";
import "./Alert.less";

function Alert(props) {
  return <Modal type={"alert"} {...props}></Modal>;
}

export default Alert;
