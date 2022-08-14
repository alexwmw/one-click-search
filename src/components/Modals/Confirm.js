import Modal from "./Modal";
import "./Confirm.less";

function Confirm(props) {
  return <Modal type={"confirm"} {...props}></Modal>;
}

export default Confirm;
