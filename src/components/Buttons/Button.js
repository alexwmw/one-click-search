import clsx from "clsx";
import Icon from "../Icons/Icon";
import "./Button.less";

function Button({ icon, children, onClick, classes }) {
  return (
    <button onClick={onClick} className={clsx("Button", classes)}>
      {icon && <Icon icon={icon} />}
      {children}
    </button>
  );
}

export default Button;
