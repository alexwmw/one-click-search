import { useState, useEffect, useMemo, useContext, useReducer } from "react";
import useNewProvider from "../../hooks/useNewProvider";
import GenericForm from "../Forms/GenericForm";
import FormField from "../Forms/FormField";
import ProviderFormReducer from "../../reducers/ProviderFormReducer";
import {
  compareObjs,
  mergeWithNewItem,
  visible,
} from "../../modules/Utilities";
import ProvidersContext from "../../contexts/ProvidersContext";

function ProviderForm(props) {
  const { nameRef = "", closeForm = () => {}, addNew = false } = props;

  const { providers, setProviders } = useContext(ProvidersContext);
  const [hasChanges, setHasChanges] = useState(false);
  const thisProv = useMemo(
    () => providers.filter((p) => p.name == nameRef)[0] || {}
  );
  const [{ name, hostname, queryPath, faviconUrl }, dispatch] = useReducer(
    ProviderFormReducer,
    {
      name: thisProv.name || "",
      hostname: thisProv.hostname || "",
      queryPath: thisProv.queryPath || "",
      faviconUrl: thisProv.faviconUrl || "",
    }
  );

  /** Event handlers */
  const submitHandler = (e) => {
    e.preventDefault();

    const [newProvider, validator] = useNewProvider(thisProv, {
      name,
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

  const deleteHandler = (e) => {
    e.preventDefault();

    if (visible(thisProv) && providers.filter((p) => visible(p)).length < 2) {
      alert("Cannot delete the only visible item.");
    } else {
      const confirmation = confirm("Are you sure you want to delete?");

      if (confirmation) {
        const newState = mergeWithNewItem(providers, {
          ...thisProv,
          delete: true,
        });

        setProviders(newState);
      }
    }
  };

  const closeHandler = (e) => {
    e.preventDefault();

    if (hasChanges && !confirm("Your changes will be lost")) {
      return;
    } else {
      closeForm();
    }
  };

  useEffect(() => {
    if (!addNew) {
      const areDifferent = compareObjs(
        thisProv,
        {
          ...thisProv,
          ...{ hostname, queryPath, faviconUrl },
        },
        "different"
      );
      setHasChanges(areDifferent);
    }
  }, [hostname, queryPath, faviconUrl]);

  return (
    <GenericForm
      classes={{ submit: [hasChanges ? "hasChanges" : ""] }}
      labels={{ submit: "Save" }}
      deleteHandler={!addNew && deleteHandler}
      closeHandler={closeHandler}
      submitHandler={submitHandler}
    >
      {addNew && (
        <FormField
          classes={["undraggable"]}
          label={"Name"}
          value={name}
          setValue={(value) => dispatch({ type: "SET_NAME", value: value })}
          formatField={() => dispatch({ type: "FORMAT_NAME" })}
        />
      )}
      <FormField
        classes={["undraggable"]}
        label={"Hostname"}
        value={hostname}
        setValue={(value) => dispatch({ type: "SET_HOSTNAME", value: value })}
        formatField={() => dispatch({ type: "FORMAT_HOSTNAME" })}
      />
      <FormField
        classes={["undraggable"]}
        label={"Query path"}
        value={queryPath}
        setValue={(value) => dispatch({ type: "SET_QUERYPATH", value: value })}
        formatField={() => dispatch({ type: "FORMAT_QUERYPATH" })}
      />
      <FormField
        classes={["undraggable"]}
        label={"Favicon URL"}
        value={faviconUrl}
        placeholder={"Default"}
        setValue={(value) => dispatch({ type: "SET_FAVICONURL", value: value })}
        formatFields={() =>
          dispatch({
            type: "FORMAT_FAVICONURL",
          })
        }
      />
    </GenericForm>
  );
}

export default ProviderForm;
