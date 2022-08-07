import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Button.less";

function Button({ icon, children, onClick }) {
  const Icon = <FontAwesomeIcon icon={icon} />;
  return (
    <button onClick={onClick} className="Button">
      {Icon}
      {children}
    </button>
  );
}

export default Button;
