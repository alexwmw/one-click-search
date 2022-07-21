import { useContext, useEffect, useMemo, useReducer, useState } from "react";
import {
  faTrashAlt as deleteIcon,
  faFloppyDisk as saveIcon,
} from "@fortawesome/free-solid-svg-icons";
import FormField from "./IconsListItem_Provider_FormField";
import FormButton from "./IconsListItem_Provider_FormButton";
import ProvidersContext from "../../../contexts/ProvidersContext";
import { compareObjs, mergeWithNewItem } from "../../../modules/Utilities";
import useNewProvider from "../../../hooks/useNewProvider";
import ProviderFormReducer from "../../../reducers/ProviderFormReducer";

function IconsListItem_Provider_Form({ name, setIsExpanded }) {
  const { providers, setProviders } = useContext(ProvidersContext);
  const [hasChanges, setHasChanges] = useState(false);

  const currentProvider = useMemo(
    () => providers.filter((p) => p.name == name)[0]
  );

  const onlyOneVisible = useMemo(
    () =>
      currentProvider.visibility == "visible" &&
      providers.filter((p) => p.visibility == "visible").length <= 1
  );

  const [{ hostname, queryPath, faviconUrl }, dispatch] = useReducer(
    ProviderFormReducer,
    {
      hostname: currentProvider.hostname,
      queryPath: currentProvider.queryPath,
      faviconUrl: currentProvider.faviconUrl,
    }
  );

  /** Event handlers */
  const saveHandler = (e) => {
    e.preventDefault();
    const [newProvider, validator] = useNewProvider(currentProvider, {
      hostname,
      queryPath,
      faviconUrl,
    });
    validator.postMessages(() => {
      const newState = mergeWithNewItem(providers, newProvider);
      setProviders(newState);
      setIsExpanded(false);
    });
  };

  useEffect(() => {
    const areDifferent = compareObjs(
      currentProvider,
      {
        ...currentProvider,
        ...{ hostname, queryPath, faviconUrl },
      },
      "different"
    );
    setHasChanges(areDifferent);
  }, [hostname, queryPath, faviconUrl]);

  /** Event handlers */
  const deleteHandler = (e) => {
    e.preventDefault();
    if (onlyOneVisible) {
      alert("Cannot delete the only visible item.");
      return;
    }
    const newState = mergeWithNewItem(providers, {
      ...currentProvider,
      delete: true,
    });
    setProviders(newState);
  };

  const fields = [
    {
      label: "Hostname:",
      value: hostname,
      id: `hostname`,
      setValue: (value) => dispatch({ type: "SET_HOSTNAME", value: value }),
      formatFields: () =>
        dispatch({ type: "FORMAT_HOSTNAME", old: currentProvider.hostname }),
    },
    {
      label: "Query path:",
      value: queryPath,
      id: `queryPath`,
      setValue: (value) => dispatch({ type: "SET_QUERYPATH", value: value }),
      formatFields: () =>
        dispatch({ type: "FORMAT_QUERYPATH", old: currentProvider.queryPath }),
    },
    {
      label: "Favicon URL:",
      value: faviconUrl,
      id: `faviconUrl`,
      placeholder: "Default",
      setValue: (value) => dispatch({ type: "SET_FAVICONURL", value: value }),
      formatFields: () =>
        dispatch({
          type: "FORMAT_FAVICONURL",
          old: currentProvider.faviconUrl,
        }),
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
