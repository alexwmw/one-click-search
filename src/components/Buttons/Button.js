import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Button.less";

function Button({ icon, children, onClick }) {
  let Icon;
  if (icon) {
    Icon = <FontAwesomeIcon icon={icon} />;
  }

  return (
    <button onClick={onClick} className="Button">
      {Icon}
      {children}
    </button>
  );
}

export default Button;
