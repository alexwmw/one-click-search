import { useState, useEffect, useMemo, useContext, useReducer } from "react";
import useNewProvider from "/src/hooks/useNewProvider";
import ProviderFormReducer from "/src/reducers/ProviderFormReducer";
import ProvidersContext from "/src/contexts/ProvidersContext";
import { compareObjs, mergeWithNewItem, visible } from "/src/modules/Utilities";
import ProviderFormFields from "../Forms/ProviderFormFields";
import Modal from "./Modal";

function AddProviderModal() {
  const { providers, setProviders } = useContext(ProvidersContext);
  const [hasChanges, setHasChanges] = useState(false);

  const defaults = useMemo(() => ({
    name: "",
    hostname: "",
    queryPath: "",
    faviconUrl: "",
    role: "provider",
    visibility: "hidden",
  }));

  const [formValues, dispatch] = useReducer(ProviderFormReducer, defaults);

  const [newProvider, validator] = useNewProvider({
    newData: formValues,
    providers: providers,
  });

  const onSubmit = () => {
    alert();
    if (validator.validateWithMessages()) {
      const newState = mergeWithNewItem(providers, newProvider);
      setProviders(newState);
      return true;
    }
    return false;
  };

  const onClose = () => {
    return !hasChanges || confirm("Your changes will be lost");
  };

  useEffect(() => {
    const areDifferent = compareObjs({}, formValues, "different");
    setHasChanges(areDifferent);
  }, [
    formValues.name,
    formValues.hostname,
    formValues.queryPath,
    formValues.faviconUrl,
  ]);

  return (
    <Modal
      type={"form"}
      title={"Add New Provider"}
      onClose={onClose}
      onProceed={onSubmit}
    >
      <ProviderFormFields
        addNew={true}
        dispatch={dispatch}
        values={formValues}
        tooltips={true}
      />
    </Modal>
  );
}

export default AddProviderModal;
