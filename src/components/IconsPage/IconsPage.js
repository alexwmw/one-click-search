import Instructions from "./IconsPage_Intructions";
import SortableList from "./IconsPage_Sortable";
import "./IconsPage.less";

import OCSproviders from "../../data/providers.json";
import OCSfunctions from "../../data/functions.json";
import { useEffect, useState } from "react";

const IconsPage = () => {
  const [providers, setProviders] = useState({
    visible: [],
    hidden: [],
    disabled: [],
  });

  /**
   * Async get stored providers and re-render
   */
  useEffect(() => {
    chrome.storage.sync.get({}, () => {
      // Get from storage. Always set. Set in background if unset.
      const result = [...OCSproviders, ...OCSfunctions];

      setProviders({
        visible: result.filter((item) => item.visibility == "visible"),
        hidden: result.filter((item) => item.visibility == "hidden"),
        disabled: result.filter((item) => item.visibility == "disabled"),
      });
    });
  }, []);

  const sortingIsFinished = (sortableItems) => {
    return sortableItems.every((item) => item.chosen !== true);
  };

  /**
   * Async store providers when providers is updated and move is finished
   */
  useEffect(() => {
    const array = [
      ...providers.visible,
      ...providers.hidden,
      ...providers.disabled,
    ];

    if (sortingIsFinished(array)) {
      console.table(array);
      // chrome.storage.sync.set
    }
  }, [providers]);

  const listComponents = [
    {
      name: "Visible",
      maxLength: 4,
      id: "visible",
      key: "visible",
      list: providers.visible,
      setList: (list) =>
        setProviders((old) => {
          return { ...old, visible: list };
        }),
    },
    {
      name: "Hidden",
      id: "hidden",
      key: "hidden",
      list: providers.hidden,
      setList: (list) =>
        setProviders((old) => {
          return { ...old, hidden: list };
        }),
    },
    {
      name: "Disabled",
      id: "disabled",
      key: "disabled",
      list: providers.disabled,
      setList: (list) =>
        setProviders((old) => {
          return { ...old, disabled: list };
        }),
    },
  ].map((section) => <SortableList {...section} />);

  return (
    <div
      className={`flex-container page`}
      id={"iconsPage"}
      direction={"column"}
    >
      <Instructions />
      {listComponents};
    </div>
  );
};

export default IconsPage;
