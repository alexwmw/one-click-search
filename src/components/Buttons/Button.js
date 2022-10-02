import clsx from "clsx";
import Icon from "../Icons/Icon";
import "./Button.less";

function Button({ icon, children, onClick, classes, type }) {
  return (
    <button type={type} onClick={onClick} className={clsx("button", classes)}>
      {icon && <Icon type={icon} />}
      {children}
    </button>
  );
}

export default Button;
