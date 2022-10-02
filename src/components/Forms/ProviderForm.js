import { useState, useEffect, useContext, useReducer } from "react";
import GenericForm from "./GenericForm";
import ProviderFormReducer from "/src/reducers/ProviderFormReducer";
import ProviderFormFields from "./ProviderFormFields";
import ChromeContext from "../../contexts/ChromeContext";
import AlertsContext from "../../contexts/AlertsContext";
import ProviderValidator from "../../modules/ProviderValidator";
import { compareObjs, visible } from "../../modules/Utilities";

function ProviderForm({ provider, closeForm }) {
  const { dispatchChrome } = useContext(ChromeContext);
  const alertHandler = useContext(AlertsContext);
  const [hasChanges, setHasChanges] = useState(false);
  const [formValues, dispatchFormValues] = useReducer(
    ProviderFormReducer,
    provider
  );

  /** Event handlers */
  const submitHandler = (e) => {
    e.preventDefault();
    const newProvider = {
      ...provider,
      ...formValues,
    };
    const validator = ProviderValidator(newProvider);
    if (validator.decision) {
      dispatchChrome({
        type: "UPDATE_PROVIDER",
        provider: newProvider,
      });
      closeForm();
    } else {
      alertHandler.invalidProviderError({ messages: validator.messages });
    }
  };

  const deleteHandler = (e) => {
    e.preventDefault();

    if (provider.onlyVisible) {
      alertHandler.onlyVisibleError();
    } else {
      alertHandler.confirm({
        title: "Confirm delete",
        question: `Are you sure you want to delete \"${provider.name}\"?`,
        onProceed: () =>
          dispatchChrome({
            type: "DELETE_PROVIDER",
            provider: provider,
          }),
      });
    }
  };


  useEffect(() => {
    const areDifferent = compareObjs(provider, formValues, {
      type: "different",
      keysOnly: true,
    });
    setHasChanges(areDifferent);
  }, [formValues]);

  return (
    <GenericForm
      classes={{ submit: [hasChanges ? "hasChanges" : ""] }}
      labels={{ submit: "Save" }}
      deleteHandler={deleteHandler}
      submitHandler={submitHandler}
    >
      <ProviderFormFields dispatch={dispatchFormValues} values={formValues} />
    </GenericForm>
  );
}

export default ProviderForm;
