import Modal from "./Modal";
import help from "../../content/help";

const HelpModal = ({ show, close, notOpts }) => {
  
  const { title, body } = help(notOpts);

  return (
    <Modal
      classes={"help-modal"}
      isOpen={show}
      title={title}
      onClose={close}
      isClosable={true}
    >
      {body}
    </Modal>
  );
};

export default HelpModal;
