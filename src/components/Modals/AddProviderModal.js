import { useState, useEffect, useMemo, useContext, useReducer } from "react";
import useNewProvider from "/src/hooks/useNewProvider";
import ProviderFormReducer from "/src/reducers/ProviderFormReducer";
import ProvidersContext from "/src/contexts/ProvidersContext";
import { compareObjs, mergeWithNewItem, visible } from "/src/modules/Utilities";
import ProviderFormFields from "../Forms/ProviderFormFields";
import Modal from "./Modal";
import "./AddProviderModal.less";
import ButtonArea from "../Buttons/ButtonArea";

function AddProviderModal({ isOpen, setIsOpen }) {
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
    if (validator.validateWithMessages()) {
      const newState = mergeWithNewItem(providers, newProvider);
      setProviders(newState);
      return true;
    }
    return false;
  };

  const onClose = () => {
    if (!hasChanges || confirm("Your changes will be lost")) {
      setIsOpen(false);
      dispatch({ type: "CLEAR_FORM", defaults: defaults });
    }
  };

  useEffect(() => {
    const areDifferent = compareObjs(defaults, formValues, "different");
    setHasChanges(areDifferent);
  }, [
    formValues.name,
    formValues.hostname,
    formValues.queryPath,
    formValues.faviconUrl,
  ]);

  return (
    <Modal
      classes={["new-provider-modal"]}
      title={"Add New Provider"}
      hasTitleBar={true}
      onClose={onClose}
      onProceed={onSubmit}
      isOpen={isOpen}
    >
      <ProviderFormFields
        addNew={true}
        dispatch={dispatch}
        values={formValues}
        tooltips={true}
        setHasChanges={setHasChanges}
      />
      <ButtonArea
        onClose={onClose}
        onProceed={onSubmit}
        proceedText={"Submit"}
      />
    </Modal>
  );
}

export default AddProviderModal;
