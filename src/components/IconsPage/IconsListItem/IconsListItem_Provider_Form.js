import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt as deleteIcon,
  faFloppyDisk as saveIcon,
} from "@fortawesome/free-solid-svg-icons";
import FormField from "./IconsListItem_Provider_FormField";
import FormButton from "./IconsListItem_Provider_FormButton";
import ProvidersContext from "../../../contexts/ProvidersContext";
import {
  providerValidation,
  updateArrayItem,
} from "../../../modules/Utilities";

function IconsListItem_Provider_Form({ name }) {
  /** State and contexts */
  const { providers, setProviders } = useContext(ProvidersContext);
  const [currentProvider, setCurrentProvider] = useState(
    providers.filter((p) => p.name == name)[0]
  );
  const [hostname, setHostname] = useState(currentProvider.hostname);
  const [queryPath, setQueryPath] = useState(currentProvider.queryPath);
  const [faviconUrl, setFaviconUrl] = useState(currentProvider.faviconUrl);
  const [hasChanges, setHasChanges] = useState(false);

  const constructNewProvider = () => {
    const newP = {
      ...currentProvider,
      hostname: hostname,
      queryPath: queryPath,
      faviconUrl: faviconUrl ? faviconUrl : "",
    };
    return [newP, providerValidation(newP)];
  };

  const onlyOneVisible =
    currentProvider.visibility == "visible" &&
    providers.filter((p) => p.visibility == "visible").length <= 1;

  /** Event handlers */
  const saveHandler = (e) => {
    e.preventDefault();
    const [newProvider, validator] = constructNewProvider();
    if (validator.decision !== true) {
      alert(validator.messages.join("\n"));
      console.table(validator.report);
      return;
    }
    setProviders(updateArrayItem(providers, newProvider));
  };

  /** Event handlers */
  const deleteHandler = (e) => {
    e.preventDefault();
    if (onlyOneVisible) {
      alert("Cannot delete the only visible item.");
      return;
    }
    setProviders(
      updateArrayItem(providers, {
        ...currentProvider,
        visibility: "delete",
      })
    );
  };

  /** useEffects */
  useEffect(() => {
    setHasChanges(
      hostname != currentProvider.hostname ||
        faviconUrl != currentProvider.faviconUrl ||
        queryPath != currentProvider.queryPath
    );
  }, [hostname, faviconUrl, queryPath, currentProvider]);

  /** useEffects */
  useEffect(() => {
    setCurrentProvider(providers.filter((p) => p.name == name)[0]);
  }, [providers]);

  const fields = [
    {
      label: "Hostname:",
      value: hostname,
      id: `hostname`,
      setValue: setHostname,
      formatFields: () =>
        setHostname((value) =>
          value
            .trim()
            .replace(/^.*:\/\/+/g, "")
            .replace(/\/.*$/g, "")
            .toLowerCase()
        ),
    },
    {
      label: "Query path:",
      value: queryPath,
      id: `queryPath`,
      setValue: setQueryPath,
      formatFields: () =>
        setQueryPath((value) =>
          value
            .trim()
            .replace(/^\/+|\/+$/g, "")
            .toLowerCase()
            .replace("$text$", "$TEXT$")
        ),
    },
    {
      label: "Favicon URL:",
      value: faviconUrl,
      id: `faviconUrl`,
      placeholder: "Default",
      setValue: setFaviconUrl,
      formatFields: () =>
        setFaviconUrl((value) =>
          value
            .trim()
            .replace(/^\/+|\/+$/g, "")
            .toLowerCase()
        ),
    },
  ];

  const inputItems = fields.map((field) => (
    <FormField key={field.id} {...field} />
  ));

  return (
    <form onClick={(e) => e.stopPropagation()}>
      {inputItems}
      <div className={"flex-container row width-100 right"}>
        <FormButton
          clickHandler={deleteHandler}
          id={"deleteButton"}
          icon={deleteIcon}
          label={"Delete"}
        />
        <FormButton
          clickHandler={saveHandler}
          id={"saveButton"}
          icon={saveIcon}
          label={"Save"}
          hasChanges={hasChanges}
        />
      </div>
    </form>
  );
}

export default IconsListItem_Provider_Form;
