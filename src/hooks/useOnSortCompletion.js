import { useContext, useEffect } from "react";
import ProvidersContext from "../contexts/ProvidersContext";
import { sortByPosition } from "../modules/Utilities";

const useOnSortCompletion = (lists) => {
  const { providers, setProviders } = useContext(ProvidersContext);
  useEffect(() => {
    console.log(lists);
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

export default useOnSortCompletion;
