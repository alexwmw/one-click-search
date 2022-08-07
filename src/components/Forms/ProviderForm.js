import { useState, useEffect, useMemo, useContext, useReducer } from "react";
import useNewProvider from "/src/hooks/useNewProvider";
import GenericForm from "/src/components/Forms/GenericForm";
import FormField from "/src/components/Forms/FormField";
import ProviderFormReducer from "/src/reducers/ProviderFormReducer";
import ProvidersContext from "/src/contexts/ProvidersContext";
import { compareObjs, mergeWithNewItem, visible } from "/src/modules/Utilities";

function ProviderForm(props) {
  const { nameRef = "", closeForm = () => {}, addNew = false } = props;

  const { providers, setProviders } = useContext(ProvidersContext);

  const [hasChanges, setHasChanges] = useState(false);

  const thisProv = useMemo(
    () => providers.filter((p) => p.name == nameRef)[0] || {}
  );

  const defaults = useMemo(() => ({
    name: "",
    hostname: "",
    queryPath: "",
    faviconUrl: "",
    role: "provider",
    visibility: "hidden",
    ...thisProv,
  }));

  const [
    { name, hostname, queryPath, faviconUrl, role, visibility },
    dispatch,
  ] = useReducer(ProviderFormReducer, defaults);

  /** Event handlers */
  const submitHandler = (e) => {
    e.preventDefault();

    const [newProvider, validator] = useNewProvider({
      oldData: thisProv,
      newData: {
        name,
        role,
        hostname,
        queryPath,
        faviconUrl,
        visibility,
      },
      updateExisting: !addNew,
      providers: providers,
    });

    if (validator.validateWithMessages()) {
      const newState = mergeWithNewItem(providers, newProvider);
      setProviders(newState);
      dispatch({ type: "CLEAR_FORM", defaults: defaults });
      closeForm();
    }
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
          label={"Name"}
          classes={["undraggable"]}
          value={name}
          setValue={(value) => dispatch({ type: "SET_NAME", value: value })}
          formatField={() => dispatch({ type: "FORMAT_NAME" })}
        />
      )}
      <FormField
        label={"Hostname"}
        classes={["undraggable"]}
        value={hostname}
        setValue={(value) => dispatch({ type: "SET_HOSTNAME", value: value })}
        formatField={() => dispatch({ type: "FORMAT_HOSTNAME" })}
      />
      <FormField
        label={"Query path"}
        classes={["undraggable"]}
        value={queryPath}
        setValue={(value) => dispatch({ type: "SET_QUERYPATH", value: value })}
        formatField={() => dispatch({ type: "FORMAT_QUERYPATH" })}
      />
      <FormField
        label={"Favicon URL"}
        classes={["undraggable"]}
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
