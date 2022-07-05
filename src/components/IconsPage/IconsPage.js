import Instructions from "./IconsPage_Intructions";
import SortableList from "./IconsPage_Sortable";
import "./IconsPage.less";

import { useEffect, useState } from "react";
const IconsPage = () => {
  const [state, setState] = useState({
    visible: [],
    hidden: [],
    disabled: [],
  });

  /**
   * Async get stored providers and re-render
   */
  useEffect(() => {
    chrome.storage.sync.get("providers", ({ providers }) => {
      setState({
        visible: providers.filter((p) => p.visibility == "visible"),
        hidden: providers.filter((p) => p.visibility == "hidden"),
        disabled: providers.filter((p) => p.visibility == "disabled"),
      });
    });
  }, []);

  /**
   * Async store providers when providers is updated and move is finished
   */
  useEffect(() => {
    const a = [...state.visible, ...state.hidden, ...state.disabled];
    const finished = a.every((p) => p.chosen !== true);
    if (finished) {
      chrome.storage.sync.set({ providers: a });
    }
  }, [state]);

  const listComponents = [
    {
      id: "visible",
      maxLength: 4,
      list: state.visible,
      setList: (list) => {
        list.forEach((e, i) => (e.visibility = "visible"));
        setState((prev) => ({ ...prev, visible: list }));
      },
    },
    {
      id: "hidden",
      list: state.hidden,
      setList: (list) => {
        list.forEach((e, i) => (e.visibility = "hidden"));
        setState((prev) => ({ ...prev, hidden: list }));
      },
    },
    {
      id: "disabled",
      list: state.disabled,
      setList: (list) => {
        list.forEach((e, i) => (e.visibility = "disabled"));
        setState((prev) => ({ ...prev, disabled: list }));
      },
    },
  ];

  const Lists = listComponents.map((list) => (
    <SortableList key={list.id} {...list} />
  ));

  return (
    <div
      className={`flex-container page`}
      id={"iconsPage"}
      direction={"column"}
    >
      <Instructions />
      {Lists};
    </div>
  );
};

export default IconsPage;
