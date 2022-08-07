import { useState, useEffect, useMemo, useContext, useReducer } from "react";
import useNewProvider from "/src/hooks/useNewProvider";
import GenericForm from "/src/components/Forms/GenericForm";
import ProviderFormReducer from "/src/reducers/ProviderFormReducer";
import ProvidersContext from "/src/contexts/ProvidersContext";
import { compareObjs, mergeWithNewItem, visible } from "/src/modules/Utilities";
import ProviderFormFields from "./ProviderFormFields";
import useDeleteProvider from "../../hooks/useDeleteProvider";

function ProviderForm({ nameRef, closeForm }) {
  const { providers, setProviders } = useContext(ProvidersContext);

  const [hasChanges, setHasChanges] = useState(false);

  const oldProvider = useMemo(
    () => providers.filter((p) => p.name == nameRef)[0] || {}
  );

  const deleteProvider = useDeleteProvider(oldProvider);

  const [formValues, dispatch] = useReducer(ProviderFormReducer, oldProvider);

  const [newProvider, validator] = useNewProvider({
    oldData: oldProvider,
    newData: formValues,
  });

  /** Event handlers */
  const submitHandler = (e) => {
    e.preventDefault();

    if (validator.validateWithMessages()) {
      const newState = mergeWithNewItem(providers, newProvider);
      setProviders(newState);
      closeForm();
    }
  };

  const isOnlyVisibleItem =
    visible(oldProvider) && providers.filter((p) => visible(p)).length < 2;

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
      oldProvider,
      {
        ...oldProvider,
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
