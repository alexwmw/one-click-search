import ProviderValidator from "/src/modules/ProviderValidator";

const useNewProvider = (data) => {
  let newProvider, validator;

  if (data.updateExisting) {
    newProvider = { ...data.oldData, ...data.newData };
    validator = ProviderValidator(newProvider);
  } else {
    newProvider = data.newData;
    validator = ProviderValidator(newProvider, data.providers);
  }

  return [newProvider, validator];
};

export default useNewProvider;
