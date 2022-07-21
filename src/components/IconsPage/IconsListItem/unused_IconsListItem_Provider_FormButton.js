import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

const IconsListItem_Provider_FormButton = ({
  clickHandler,
  icon,
  label,
  id,
  hasChanges,
}) => {
  return (
    <button
      onClick={clickHandler}
      className={`undraggable button ${id} ${hasChanges ? "unsaved" : ""}`}
    >
      <Icon icon={icon}></Icon>
      <span>{label}</span>
    </button>
  );
};

export default IconsListItem_Provider_FormButton;
