import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt as deleteIcon,
  faFloppyDisk as saveIcon,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

function IconsListItem_Provider_Form(props) {
  const [state, setState] = useState({});

  chrome.storage.sync.get("providers", ({ providers }) => {
    console.table(providers);
  });

  const saveHandler = (e) => {
    e.preventDefault();

    chrome.storage.sync.get("providers", ({ providers }) => {
      const newData = [];
      providers.forEach((p, i) => {
        newData[i] = p.name == props.name ? { ...p, ...state } : { ...p };
      });
      console.table(newData);
      chrome.storage.sync.set({ providers: newData });
    });

    alert("Changes saved!");
  };

  const deleteHandler = (e) => {
    e.preventDefault();

    const confirmed = confirm("Are you sure?");
    if (confirmed) {
      chrome.storage.sync.get("providers", ({ providers }) => {
        const newData = providers.filter((p) => p.name !== props.name);
        console.log("Deleting in the form:");
        console.table(providers);
        console.table(newData);
        //chrome.storagesync.set({ providers: newData });
      });
    }
  };

  const rowAttr = [
    {
      label: "Hostname:",
      value: props.hostname,
      id: `hostname`,
    },
    {
      label: "Query path:",
      value: props.queryPath,
      id: `queryPath`,
    },
    {
      label: "Favicon URL:",
      value: props.faviconUrl,
      id: `faviconUrl`,
      placeholder: "Default: hostname.com/favicon.ico",
    },
  ];

  useEffect(() => {
    rowAttr.forEach((row) =>
      setState((oldState) => ({ ...oldState, [row.id]: row.value }))
    );
  }, []);

  const inputRows = rowAttr.map((row) => (
    <div key={row.label} className="flex-container row center">
      <label>{row.label}</label>
      <input
        type={"text"}
        onChange={(e) =>
          setState((state) => ({ ...state, [row.id]: e.target.value }))
        }
        value={state[row.id]}
        placeholder={row.placeholder}
      />
    </div>
  ));

  const buttonRow = (
    <div className={"flex-container wrow.idth-100 right"}>
      <button onClick={deleteHandler} className={"button deleteButton"}>
        <Icon icon={deleteIcon}></Icon>
        <span>Delete</span>
      </button>
      <button onClick={saveHandler} className={"button saveButton"}>
        <Icon icon={saveIcon}></Icon>
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
