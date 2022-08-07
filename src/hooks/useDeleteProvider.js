import { useContext } from "react";
import ProvidersContext from "../contexts/ProvidersContext";
import { mergeWithNewItem } from "../modules/Utilities";

const useDeleteProvider = (provider) => {
  const { providers, setProviders } = useContext(ProvidersContext);

  const deleteProviders = () => {
    const newState = mergeWithNewItem(providers, {
      ...provider,
      delete: true,
    });

    setProviders(newState);
  };

  return deleteProviders;
};

export default useDeleteProvider;
