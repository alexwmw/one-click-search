import { useState, useEffect, useContext, useReducer } from "react";
import GenericForm from "/src/components/Forms/GenericForm";
import ProviderFormReducer from "/src/reducers/ProviderFormReducer";
import ProviderFormFields from "./ProviderFormFields";
import ChromeContext from "../../contexts/ChromeContext";
import AlertsContext from "../../contexts/AlertsContext";
import ProviderValidator from "../../modules/ProviderValidator";
import { compareObjs, visible } from "../../modules/Utilities";

function ProviderForm({ provider, closeForm }) {
  const { providers, dispatchChrome } = useContext(ChromeContext);
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
      alertHandler.error({ title: "Error", messages: validator.messages });
    }
  };

  const deleteHandler = (e) => {
    e.preventDefault();

    const isOnlyVisibleItem =
      visible(provider) && providers.filter((p) => visible(p)).length < 2;

    if (isOnlyVisibleItem) {
      alertHandler.error({
        title: "Single Visible Item Error",
        messages: [
          "Cannot delete the only visible provider.",
          "Add another provider to the visible list first.",
        ],
      });
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

  const closeHandler = (e) => {
    closeForm();
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
      closeHandler={closeHandler}
      submitHandler={submitHandler}
    >
      <ProviderFormFields dispatch={dispatchFormValues} values={formValues} />
    </GenericForm>
  );
}

export default ProviderForm;
