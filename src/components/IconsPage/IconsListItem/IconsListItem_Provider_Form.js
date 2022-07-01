import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt as deleteIcon,
  faFloppyDisk as saveIcon,
} from "@fortawesome/free-solid-svg-icons";

function IconsListItem_Provider_Form(props) {
  const tabbabool = (isTrue) => (isTrue ? 0 : -1);
  const isTabbable = tabbabool(props.isExpanded);

  return (
    <form>
      <div className={"flex-container row center"}>
        <label tabIndex={-1}>URL:</label>
        <input type="text" tabIndex={isTabbable} value={props.url}></input>
      </div>
      <div className={"flex-container row center"}>
        <label tabIndex={-1}>Query path:</label>
        <input
          type="text"
          tabIndex={isTabbable}
          value={props.queryPath}
        ></input>
      </div>
      <div className={"flex-container row center"}>
        <label tabIndex={-1}>Favicon URL:</label>
        <input
          type="text"
          placeholder={"default: url/favicon.ico"}
          tabIndex={isTabbable}
          value={props.faviconUrl}
        ></input>
      </div>
      <div className={"flex-container width-100 right"}>
        <button className={"button deleteButton"} tabIndex={isTabbable}>
          <FontAwesomeIcon icon={deleteIcon}></FontAwesomeIcon>{" "}
          <span>Delete</span>
        </button>
        <button className={"button saveButton"} tabIndex={isTabbable}>
          <FontAwesomeIcon icon={saveIcon}></FontAwesomeIcon> <span>Save</span>
        </button>
      </div>
    </form>
  );
}

export default IconsListItem_Provider_Form;
