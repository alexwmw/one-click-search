import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt as deleteIcon,
  faFloppyDisk as saveIcon,
} from "@fortawesome/free-solid-svg-icons";
import ProvidersContext from "../../../contexts/ProvidersContext";
import SortableListContext from "../../../contexts/SortableListContext";
import {
  providerValidation,
  removeArrayItem,
  splitSortables,
  updateArrayItem,
} from "../../../modules/Utilities";

function IconsListItem_Provider_Form({
  provider,
  setParentProvider,
  setIsUnsaved,
  visibilityList,
}) {
  /** State and contexts */
  const { providers, storeProviders } = useContext(ProvidersContext);
  const { sortables, setSortables } = useContext(SortableListContext);
  /** ** Form Fields */
  const [hostname, setHostname] = useState(provider.hostname);
  const [queryPath, setQueryPath] = useState(provider.queryPath);
  const [faviconUrl, setFaviconUrl] = useState(provider.faviconUrl);
  const [hasChanges, setHasChanges] = useState(false);

  /** Helper function */
  const formatFields = () => {
    setHostname((value) =>
      value
        .trim()
        .replace(/^.*:\/\/+/g, "")
        .replace(/\/.*$/g, "")
        .toLowerCase()
    );
    setQueryPath((value) =>
      value
        .trim()
        .replace(/^\/+|\/+$/g, "")
        .toLowerCase()
        .replace("$text$", "$TEXT$")
    );
    setFaviconUrl((value) =>
      value
        .trim()
        .replace(/^\/+|\/+$/g, "")
        .toLowerCase()
    );
  };

  const changeRoutine = () => {
    // Update the sortable list (IconsPage via context) so that the it sorts correctly
    const sortableList = splitSortables(providers)[visibilityList];
    setSortables((oldObject) => ({
      ...oldObject,
      [visibilityList]: sortableList,
    }));
    // Tell the parent there are no unsaved changes
    setHasChanges(false);
    // store the details in chrome.storage
    storeProviders(providers);
  };

  /** Event handlers */
  const saveHandler = (e) => {
    e.preventDefault();
    const newProvider = {
      ...provider,
      hostname: hostname,
      queryPath: queryPath,
      faviconUrl: faviconUrl,
    };
    const validator = providerValidation(newProvider);

    if (validator.decision === true) {
      // Find the provider in the list of providers and replace it with newProvider
      // Update the provider in the parent so that this list item re-renders
      updateArrayItem(providers, newProvider);
      setParentProvider(newProvider);

      changeRoutine();
    } else {
      alert(validator.messages.join("\n"));
    }
  };

  const deleteHandler = (e) => {
    e.preventDefault();
    if (visibilityList == "visible" && sortables.visible.length >= 1) {
      alert("Cannot delete the only visible item.");
      return;
    }
    removeArrayItem(providers, provider, true);
    changeRoutine();
  };

  useEffect(() => {
    setHasChanges(
      hostname != provider.hostname ||
        faviconUrl != provider.faviconUrl ||
        queryPath != provider.queryPath
    );
  }, [hostname, faviconUrl, queryPath]);

  useEffect(() => {
    setIsUnsaved(hasChanges);
  }, [hasChanges]);

  const fields = [
    {
      label: "Hostname:",
      value: hostname,
      id: `hostname`,
      setValue: setHostname,
    },
    {
      label: "Query path:",
      value: queryPath,
      id: `queryPath`,
      setValue: setQueryPath,
    },
    {
      label: "Favicon URL:",
      value: faviconUrl,
      id: `faviconUrl`,
      placeholder: "Default: hostname.com/favicon.ico",
      setValue: setFaviconUrl,
    },
  ];

  const TextInputs = fields.map((field) => (
    <div key={field.id} className="flex-container row center">
      <label>{field.label}</label>
      <input
        type={"text"}
        className={"undraggable"}
        onChange={(e) => field.setValue(e.target.value)}
        onBlur={formatFields}
        onFocus={(e) => e.target.select()}
        value={field.value}
        placeholder={field.placeholder}
      />
    </div>
  ));

  const buttonRow = (
    <div className={"flex-container row width-100 right"}>
      <button onClick={deleteHandler} className={"button deleteButton"}>
        <Icon icon={deleteIcon}></Icon>
        <span>Delete</span>
      </button>
      <button
        onClick={saveHandler}
        className={`button saveButton ${hasChanges ? "unsaved" : ""}`}
      >
        <Icon icon={saveIcon}></Icon>
        <span>Save</span>
      </button>
    </div>
  );

  return (
    <form>
      {TextInputs}
      {buttonRow}
    </form>
  );
}

export default IconsListItem_Provider_Form;
