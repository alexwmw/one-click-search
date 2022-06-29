import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt as deleteIcon } from "@fortawesome/free-solid-svg-icons";
import { FlexContainer } from "../../basic-components/BasicStyledComponents";

function IconsLI_Form(props) {
  const isOpen = props.isOpen === "false" && "0";

  return (
    <form>
      <FlexContainer width="unset" direction="row">
        <label tabIndex={isOpen}>URL:</label>
        <input type="text" tabIndex={isOpen}></input>
      </FlexContainer>
      <FlexContainer width="unset" direction="row">
        <label tabIndex={isOpen}>Query path:</label>
        <input type="text" tabIndex={isOpen}></input>
      </FlexContainer>
      <FlexContainer width="unset" direction="row">
        <label tabIndex={isOpen}>Favicon URL:</label>
        <input type="text" placeholder tabIndex={isOpen}></input>
      </FlexContainer>
      <FlexContainer width="unset" alignItems="flex-end">
        <button>
          <FontAwesomeIcon icon={deleteIcon}></FontAwesomeIcon>{" "}
          <span>Delete</span>
        </button>
      </FlexContainer>
    </form>
  );
}

export default IconsLI_Form;
