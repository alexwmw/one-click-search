import { useState, useEffect, useMemo, useContext, useReducer } from "react";
import useNewProvider from "/src/hooks/useNewProvider";
import GenericForm from "/src/components/Forms/GenericForm";
import ProviderFormReducer from "/src/reducers/ProviderFormReducer";
import { compareObjs, mergeWithNewItem, visible } from "/src/modules/Utilities";
import ProviderFormFields from "./ProviderFormFields";
import useDeleteProvider from "../../hooks/useDeleteProvider";
import ChromeContext from "../../contexts/ChromeContext";

function ProviderForm({ provider, closeForm }) {
  const { chrome, dispatchChrome } = useContext(ChromeContext);

  const [hasChanges, setHasChanges] = useState(false);

  const deleteProvider = useDeleteProvider(provider);

  const [formValues, dispatch] = useReducer(ProviderFormReducer, provider);

  const [newProvider, validator] = useNewProvider({
    oldData: provider,
    newData: formValues,
  });

  /** Event handlers */
  const submitHandler = (e) => {
    e.preventDefault();

    if (validator.validateWithMessages()) {
      const newState = mergeWithNewItem(chrome.providers, newProvider);
      setProviders(newState);
      closeForm();
    }
  };

  const isOnlyVisibleItem =
    visible(provider) && chrome.providers.filter((p) => visible(p)).length < 2;

  const deleteHandler = (e) => {
    e.preventDefault();

    if (isOnlyVisibleItem) {
      alert("Cannot delete the only visible item.");
    } else {
      confirm("Are you sure you want to delete?") && deleteProvider();
    }
  };

  const closeHandler = (e) => {
    e.preventDefault();
    if (!hasChanges || confirm("Your changes will be lost")) {
      closeForm();
    }
  };

  const { hostname, queryPath, faviconUrl } = formValues;

  useEffect(() => {
    const areDifferent = compareObjs(
      provider,
      {
        ...provider,
        ...{ hostname, queryPath, faviconUrl },
      },
      "different"
    );
    setHasChanges(areDifferent);
  }, [hostname, queryPath, faviconUrl]);

  return (
    <GenericForm
      classes={{ submit: [hasChanges ? "hasChanges" : ""] }}
      labels={{ submit: "Save" }}
      deleteHandler={deleteHandler}
      closeHandler={closeHandler}
      submitHandler={submitHandler}
    >
      <ProviderFormFields dispatch={dispatch} values={formValues} />
    </GenericForm>
  );
}

export default ProviderForm;
