import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt as deleteIcon,
  faFloppyDisk as saveIcon,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function IconsListItem_Provider_Form(props) {
  const saveHandler = () => {};
  const deleteHandler = () => {};

  const rowAttr = [
    {
      label: "Hostname:",
      value: props.hostname,
      id: `${props.name}_hostname`,
    },
    {
      label: "Query path:",
      value: props.queryPath,
      id: `${props.name}_querypath`,
    },
    {
      label: "Favicon URL:",
      value: props.faviconUrl,
      id: `${props.name}_favicon`,
      placeholder: "Default: hostname.com/favicon.ico",
    },
  ];

  const inputRows = rowAttr.map((row) => {
    [row.id, row.setValue] = useState(row.value);
    
    return (
      <div key={row.label} className="flex-container row center">
        <label>{row.label}</label>
        <input
          type={"text"}
          onChange={(e) => row.setValue(e.target.value)}
          value={row.id}
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
