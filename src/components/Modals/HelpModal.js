import Modal from "./Modal";
import help from "../../content/help";

const HelpModal = ({ show, close }) => {
  return (
    <Modal isOpen={show} title={help.title} onClose={close} isClosable={true}>
      {help.body}
    </Modal>
  );
};

export default HelpModal;
