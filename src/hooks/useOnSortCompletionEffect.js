import { useContext, useEffect } from "react";
import ProvidersContext from "/src/contexts/ProvidersContext";
import { sortByPosition } from "/src/modules/Utilities";

const useOnSortCompletionEffect = (lists) => {
  const { providers, setProviders } = useContext(ProvidersContext);
  useEffect(() => {
    const array = sortByPosition([
      ...lists.none,
      ...lists.visible,
      ...lists.hidden,
      ...lists.disabled,
    ]);
    const sortingIsFinished = array.every((p) => p.chosen !== true);
    const isRearranged = array.some(
      (e, i, a) =>
        a[i].name !== providers[i].name ||
        a[i].visibility !== providers[i].visibility
    );
    if (sortingIsFinished && isRearranged) {
      setProviders(array);
    }
  }, [lists]);
};

export default useOnSortCompletionEffect;
