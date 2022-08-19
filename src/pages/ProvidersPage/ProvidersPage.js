import { useContext, useEffect, useReducer, useState } from "react";
import ProvidersContext from "/src/contexts/ProvidersContext";
import SortablesReducer from "/src/reducers/SortablesReducer";
import useOnSortCompletionEffect from "/src/hooks/useOnSortCompletionEffect";

import { disabled, hidden, visible } from "/src/modules/Utilities";

import "./ProvidersPage.less";
import SortableSection from "./SortableSection";

const ProvidersPage = () => {
  /** State and contexts */
  const { providers, setProviders } = useContext(ProvidersContext);
  const [openItem, setOpenItem] = useState(null);
  const [sortables, sortablesDispatch] = useReducer(SortablesReducer, {
    visible: providers.filter((p) => visible(p)),
    hidden: providers.filter((p) => hidden(p)),
    disabled: providers.filter((p) => disabled(p)),
    none: providers.filter((p) => !visible(p) && !hidden(p) && !disabled(p)),
  });

  /** setProviders when lists are sorted into a different order */
  useOnSortCompletionEffect(sortables);

  /** Re-set lists on providers change */
  useEffect(() => {
    sortablesDispatch({
      type: "SET_ALL_LISTS",
      providers: providers.filter((p) => !p.delete),
    });
  }, [providers]);

  return (
    <div
      className={`flex-container page`}
      id={"providersPage"}
      direction={"column"}
    >
      <SortableSection
        openItem={openItem}
        setOpenItem={setOpenItem}
        id={"visible"}
        name={"Visible"}
        maxLength={4}
        list={sortables.visible}
        setList={(list) =>
          sortablesDispatch({ type: "SET_VISIBLE", list: list })
        }
      />
      <SortableSection
        openItem={openItem}
        setOpenItem={setOpenItem}
        id={"hidden"}
        name={"Hidden"}
        list={sortables.hidden}
        setList={(list) =>
          sortablesDispatch({ type: "SET_HIDDEN", list: list })
        }
      />
      <SortableSection
        openItem={openItem}
        setOpenItem={setOpenItem}
        id={"disabled"}
        name={"Disabled"}
        list={sortables.disabled}
        setList={(list) =>
          sortablesDispatch({ type: "SET_DISABLED", list: list })
        }
      />
    </div>
  );
};

export default ProvidersPage;
