import { useContext } from "react";
import ProvidersContext from "../contexts/ProvidersContext";
import { replaceObjectInArray } from "../modules/Utilities";

const useDeleteProvider = (provider) => {
  const { providers, setProviders } = useContext(ProvidersContext);

  const deleteProviders = () => {
    const newState = replaceObjectInArray(providers, {
      ...provider,
      delete: true,
    });

    setProviders(newState);
  };

  return deleteProviders;
};

export default useDeleteProvider;
