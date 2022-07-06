import { useContext, useState } from "react";
import ProvidersContext from "../../contexts/ProvidersContext";
import Instructions from "./IconsPage_Intructions";
import SortableList from "./IconsPage_Sortable";
import {
  splitSortables,
  mergeSortables,
  isUpdated,
} from "../../modules/Utilities";
import "./IconsPage.less";

const IconsPage = () => {
  /** State and contexts */
  const { providers, storeProviders } = useContext(ProvidersContext);
  const [sortables, setSortables] = useState(splitSortables(providers));

  /** Wrapper function for setSortables */
  const setStateFromSortable = (keyValue) => {
    setSortables((oldObject) => {
      const newObject = { ...oldObject, ...keyValue };
      const oldArray = mergeSortables(oldObject);
      const newArray = mergeSortables(newObject);
      if (isUpdated(oldArray, newArray)) {
        storeProviders(newArray);
      }
      return newObject;
    });
  };

  const sortableComponents = [
    {
      id: "visible",
      maxLength: 4,
      list: sortables.visible,
      setList: (list) => {
        list.forEach((e, i) => (e.visibility = "visible"));
        setStateFromSortable({ visible: list });
      },
    },
    {
      id: "hidden",
      list: sortables.hidden,
      setList: (list) => {
        list.forEach((e, i) => (e.visibility = "hidden"));
        setStateFromSortable({ hidden: list });
      },
    },
    {
      id: "disabled",
      list: sortables.disabled,
      setList: (list) => {
        list.forEach((e, i) => (e.visibility = "disabled"));
        setStateFromSortable({ disabled: list });
      },
    },
  ];

  const SortableLists = sortableComponents.map((component) => (
    <SortableList key={component.id} {...component} />
  ));

  return (
    <div
      className={`flex-container page`}
      id={"iconsPage"}
      direction={"column"}
    >
      <Instructions />
      {SortableLists};
    </div>
  );
};

export default IconsPage;
