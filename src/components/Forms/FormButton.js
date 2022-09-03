import {
  faTrashAlt as deleteIcon,
  faFloppyDisk as submitIcon,
  faClose as closeIcon,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FormButton = (props) => {
  const { type, onClick, label, classes = [] } = props;

  const btnProps = {
    submit: {
      label: label || "Submit",
      type: "submit",
      icon: submitIcon,
      classes: "submitBtn " + classes.join(" "),
    },
    delete: {
      label: label || "Delete",
      type: "button",
      icon: deleteIcon,
      classes: "deleteBtn " + classes.join(" "),
    },
    close: {
      label: label || "Close",
      type: "button",
      icon: closeIcon,
      classes: "closeBtn " + classes.join(" "),
    },
  }[type];

  return (
    <button
      className={`btn formBtn ${btnProps.classes}`}
      type={btnProps.type}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={btnProps.icon} />
      <span>{btnProps.label}</span>
    </button>
  );
};
export default FormButton;
