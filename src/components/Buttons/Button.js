import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import "./Button.less";

function Button({ icon, children, onClick, classes }) {
  let Icon;
  if (icon) {
    Icon = <FontAwesomeIcon icon={icon} />;
  }

  return (
    <button onClick={onClick} className={clsx("Button", classes)}>
      {Icon}
      {children}
    </button>
  );
}

export default Button;
