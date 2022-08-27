import Modal from "./Modal";
import "./Confirm.less";
import ButtonArea from "../Buttons/ButtonArea";

function Confirm(props) {
  let isOpen, setIsOpen, onClose;

  if (!props.hasOwnProperty("isOpen")) {
    [isOpen, setIsOpen] = useState(true);
    onClose = () => setIsOpen(false);
  } else {
    isOpen = props.isOpen;
    onClose = props.onClose;
  }

  return (
    <Modal {...props} isOpen={isOpen} onClose={onClose}>
      {props.children}
      <ButtonArea onClose={props.onClose} onProceed={props.onProceed} />
    </Modal>
  );
}

export default Confirm;
