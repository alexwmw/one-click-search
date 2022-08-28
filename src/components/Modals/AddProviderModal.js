import { useState, useEffect, useMemo, useReducer } from "react";
import ProviderFormReducer from "/src/reducers/ProviderFormReducer";
import Modal from "./Modal";
import ButtonArea from "../Buttons/ButtonArea";
import ProviderFormFields from "../Forms/ProviderFormFields";
import ProviderValidator from "../../modules/ProviderValidator";
import ChromeDispatcher from "../../modules/ChromeDispatcher";
import { compareObjs } from "../../modules/Utilities";
import "./AddProviderModal.less";

function AddProviderModal({ isOpen, setIsOpen }) {
  //const alertHandler = useContext(AlertsContext);
  const [hasChanges, setHasChanges] = useState(false);
  const defaults = useMemo(() => ({
    name: "",
    hostname: "",
    queryPath: "",
    faviconUrl: "",
    role: "provider",
    visibility: "hidden",
  }));

  const [formValues, dispatchFormValues] = useReducer(
    ProviderFormReducer,
    defaults
  );

  const dispatchChrome = ChromeDispatcher;

  const onSubmit = () => {
    chrome.storage.sync.get(["providers"], (result) => {
      const validator = ProviderValidator(formValues, result.providers);
      if (validator.decision) {
        dispatchChrome({
          type: "ADD_NEW_PROVIDER",
          provider: formValues,
        });
        dispatchFormValues({ type: "CLEAR_FORM", defaults: defaults });
        setIsOpen(false);
      } else {
        //alertHandler.error({ title: "x", messages: validator.messages });
        alert(validator.messages.join("\n"));
      }
    });
  };

  const onClose = () => {
    if (!hasChanges || confirm("Your changes will be lost")) {
      setIsOpen(false);
      dispatchFormValues({ type: "CLEAR_FORM", defaults: defaults });
    }
  };

  useEffect(() => {
    const areDifferent = compareObjs(defaults, formValues, {
      type: "different",
    });
    setHasChanges(areDifferent);
  }, [formValues]);

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
        dispatch={dispatchFormValues}
        values={formValues}
        tooltips={true}
        setHasChanges={setHasChanges}
      />
      <ButtonArea
        onClose={onClose}
        onProceed={() => onSubmit()}
        proceedText={"Submit"}
        closeOnSubmit={false}
      />
    </Modal>
  );
}

export default AddProviderModal;
