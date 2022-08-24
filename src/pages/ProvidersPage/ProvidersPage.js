import { useContext, useEffect, useReducer, useState } from "react";
import SortableSection from "./SortableSection";
import SortablesReducer from "../../reducers/SortablesReducer";
import ChromeContext from "../../contexts/ChromeContext";
import { sortablesFromProviders } from "../../modules/Utilities";
import clsx from "clsx";
import "./ProvidersPage.less";

const ProvidersPage = () => {
  /** State and contexts */
  const [openItem, setOpenItem] = useState(null);
  const { chrome } = useContext(ChromeContext);

  const [sortables, dispatchSortables] = useReducer(
    SortablesReducer,
    chrome.providers,
    sortablesFromProviders
  );

  useEffect(() => {
    dispatchSortables({ type: "SET_ALL_LISTS", providers: chrome.providers });
  }, [chrome]);

  return (
    <div
      className={clsx("flex-container", "page")}
      id={"providersPage"}
      direction={"column"}
    >
      {sortables && (
        <>
          <SortableSection
            openItem={openItem}
            setOpenItem={setOpenItem}
            id={"visible"}
            name={"Visible"}
            maxLength={4}
            list={sortables.visible}
            setList={(list) =>
              dispatchSortables({ type: "SET_VISIBLE", list: list })
            }
          />
          <SortableSection
            openItem={openItem}
            setOpenItem={setOpenItem}
            id={"hidden"}
            name={"Hidden"}
            list={sortables.hidden}
            setList={(list) =>
              dispatchSortables({ type: "SET_HIDDEN", list: list })
            }
          />
          <SortableSection
            openItem={openItem}
            setOpenItem={setOpenItem}
            id={"disabled"}
            name={"Disabled"}
            list={sortables.disabled}
            setList={(list) =>
              dispatchSortables({ type: "SET_DISABLED", list: list })
            }
          />
        </>
      )}
    </div>
  );
};

export default ProvidersPage;
