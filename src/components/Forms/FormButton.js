import clsx from "clsx";
import Button from "../Buttons/Button";

const FormButton = (props) => {
  const { type, onClick, label, classes = [] } = props;

  const btnProps =
    {
      submit: {
        label: label || "Submit",
        type: "submit",
        icon: "save",
        classes: [...classes, "submitBtn"],
      },
      delete: {
        label: label || "Delete",
        type: "button",
        icon: "delete",
        classes: [...classes, "deleteBtn"],
      },
      close: {
        label: label || "Close",
        type: "button",
        icon: "close",
        classes: [...classes, "closeBtn"],
      },
    }[type] ?? {};

  return (
    <Button
      classes={clsx("btn", "formBtn", btnProps.classes)}
      type={btnProps.type}
      onClick={onClick}
      icon={btnProps.icon}
    >
      <span>{btnProps.label}</span>
    </Button>
  );
};
export default FormButton;
