import { useContext, useEffect, useReducer, useState } from "react";
import ProvidersContext from "../../contexts/ProvidersContext";
import SortablesReducer from "../../reducers/SortablesReducer";
import Instructions from "./IconsPage_Intructions";
import SortableList from "./SortableList";
import "./IconsPage.less";
import useOnSortCompletion from "../../hooks/useOnSortCompletion";

const IconsPage = () => {
  /** State and contexts */
  const { providers, setProviders } = useContext(ProvidersContext);
  const [openItem, setOpenItem] = useState(null);
  const [sortables, sortablesDispatch] = useReducer(SortablesReducer, {
    visible: providers.filter((p) => p.visibility == "visible"),
    hidden: providers.filter((p) => p.visibility == "hidden"),
    disabled: providers.filter((p) => p.visibility == "disabled"),
    none: providers.filter((p) =>
      ["visible", "hidden", "disabled"].every((str) => str !== p.visibility)
    ),
  });

  /** setProviders when lists are sorted into a different order */
  useOnSortCompletion(sortables);

  /** Re-set lists on providers change */
  useEffect(
    () => sortablesDispatch({ type: "SET_ALL_LISTS", providers: providers }),
    [providers]
  );

  return (
    <div
      className={`flex-container page`}
      id={"iconsPage"}
      direction={"column"}
    >
      <Instructions />
      <SortableList
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
      <SortableList
        openItem={openItem}
        setOpenItem={setOpenItem}
        id={"hidden"}
        name={"Hidden"}
        list={sortables.hidden}
        setList={(list) =>
          sortablesDispatch({ type: "SET_HIDDEN", list: list })
        }
      />
      <SortableList
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

export default IconsPage;
