import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt as deleteIcon } from "@fortawesome/free-solid-svg-icons";

function IconsLI_Form(props) {
  const isOpen = props.isOpen === "false" && "0";

  return (
    <form>
      <div className={"flex-container row center"}>
        <label tabIndex={isOpen}>URL:</label>
        <input type="text" tabIndex={isOpen}></input>
      </div>
      <div className={"flex-container row center"}>
        <label tabIndex={isOpen}>Query path:</label>
        <input type="text" tabIndex={isOpen}></input>
      </div>
      <div className={"flex-container row center"}>
        <label tabIndex={isOpen}>Favicon URL:</label>
        <input type="text" placeholder tabIndex={isOpen}></input>
      </div>
      <div className={"flex-container width-100 right"}>
        <button>
          <FontAwesomeIcon icon={deleteIcon}></FontAwesomeIcon>{" "}
          <span>Delete</span>
        </button>
      </div>
    </form>
  );
}

export default IconsLI_Form;
