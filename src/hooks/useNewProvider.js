import ProviderValidator from "../modules/ProviderValidator";

const useNewProvider = (providerData, newData = {}) => {
  const newProvider = { ...providerData, ...newData };
  const validator = ProviderValidator(newProvider);
  return [newProvider, validator];
};

export default useNewProvider;
