import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt as deleteIcon,
  faFloppyDisk as saveIcon,
} from "@fortawesome/free-solid-svg-icons";

function IconsListItem_Provider_Form(props) {
  const saveHandler = () => {};
  const deleteHandler = () => {};

  const rowAttr = [
    { label: "Hostname:", value: props.hostname, onChange: () => {} },
    { label: "Query path:", value: props.queryPath, onChange: () => {} },
    {
      label: "Favicon URL:",
      value: props.faviconUrl,
      placeholder: "Default: hostname.com/favicon.ico",
      onChange: () => {},
    },
  ];

  const inputRows = rowAttr.map((row) => {
    return (
      <div key={row.label} className="flex-container row center">
        <label>{row.label}</label>
        <input
          type={"text"}
          onChange={row.onChange}
          value={row.value}
          placeholder={row.placeholder}
        />
      </div>
    );
  });

  const buttonRow = (
    <div className={"flex-container width-100 right"}>
      <button className={"button deleteButton"}>
        <Icon onClick={deleteHandler} icon={deleteIcon}></Icon>
        <span>Delete</span>
      </button>
      <button className={"button saveButton"}>
        <Icon onClick={saveHandler} icon={saveIcon}></Icon>
        <span>Save</span>
      </button>
    </div>
  );

  return (
    <form>
      {inputRows}
      {buttonRow}
    </form>
  );
}

export default IconsListItem_Provider_Form;
