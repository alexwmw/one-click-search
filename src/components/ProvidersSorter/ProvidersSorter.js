import { useEffect, useReducer, useState } from "react";
import clsx from "clsx";
import SortableSection from "./SortableSection";
import SortablesReducer from "../../reducers/SortablesReducer";
import ChromeContext from "../../contexts/ChromeContext";
import ChromeDispatcher from "../../modules/ChromeDispatcher";
import useChromeGet from "../../hooks/useChromeGet";
import useChromeListener from "../../hooks/useChromeListener";
import {
  arrayFromSortables,
  placesHaveChanged,
  sortablesFromProviders,
  sortIsFinished,
} from "../../modules/Utilities";
import AlertsContext from "../../contexts/AlertsContext";
import useAlerts from "../../hooks/useAlerts";

const ProvidersSorter = (props) => {
  /** State and contexts */
  const [openItem, setOpenItem] = useState(null);
  const [providers, setProviders] = useState([]);
  const { alertHandler, AlertProvider } = useAlerts();

  const dispatchChrome = ChromeDispatcher;
  const [sortables, dispatchSortables] = useReducer(
    SortablesReducer,
    providers,
    sortablesFromProviders
  );

  /** Get providers on first render */
  useChromeGet(
    (result) => {
      setProviders(result.providers);
    },
    ["providers"]
  );

  /** Update providers when changes occur elsewhere in the extension */
  useChromeListener(
    ({ oldValue, newValue }) => {
      setProviders(newValue);
    },
    ["providers"]
  );

  useEffect(() => {
    dispatchSortables({ type: "SET_ALL_LISTS", providers: providers });
  }, [providers]);

  useEffect(() => {
    const array = arrayFromSortables(sortables);
    const finished = sortIsFinished(array);
    if (finished) {
      const rearranged = placesHaveChanged(array, providers);
      if (rearranged) {
        dispatchChrome({ type: "SET_PROVIDERS", providers: array });
      }
    }
  }, [sortables]);

  return (
    <>
      <AlertProvider />
      <div className="page-container">
        <div
          className={clsx("flex-container", "page")}
          id={"providersPage"}
          direction={"column"}
        >
          {props.children}
          {sortables && (
            <AlertsContext.Provider value={alertHandler}>
              <ChromeContext.Provider value={{ providers, dispatchChrome }}>
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
              </ChromeContext.Provider>
            </AlertsContext.Provider>
          )}
        </div>
      </div>
    </>
  );
};

export default ProvidersSorter;
