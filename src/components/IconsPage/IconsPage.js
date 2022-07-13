import { useContext, useEffect, useState } from "react";
import ProvidersContext from "../../contexts/ProvidersContext";
import SortableListContext from "../../contexts/SortableListContext";
import Instructions from "./IconsPage_Intructions";
import SortableList from "./IconsPage_Sortable";
import "./IconsPage.less";
import { sortByPosition } from "../../modules/Utilities";

const IconsPage = () => {
  /** State and contexts */
  const { providers, setProviders } = useContext(ProvidersContext);

  const [openItem, setOpenItem] = useState(null);

  const [visible, setVisible] = useState(
    providers.filter((p) => p.visibility == "visible")
  );
  const [hidden, setHidden] = useState(
    providers.filter((p) => p.visibility == "hidden")
  );
  const [disabled, setDisabled] = useState(
    providers.filter((p) => p.visibility == "disabled")
  );

  /** Const */
  const listNames = ["visible", "hidden", "disabled"];
  const none = providers.filter((p) =>
    listNames.every((name) => name !== p.visibility)
  );

  /** Re-render on providers change */
  useEffect(() => {
    setVisible(providers.filter((p) => p.visibility == "visible"));
    setHidden(providers.filter((p) => p.visibility == "hidden"));
    setDisabled(providers.filter((p) => p.visibility == "disabled"));
  }, [providers]);

  /** setProviders when lists are sorted into a different order */
  useEffect(() => {
    const array = sortByPosition([...none, ...visible, ...hidden, ...disabled]);
    const sortingIsFinished = array.every((p) => p.chosen !== true);
    const isRearranged = array.some(
      (e, i, a) =>
        a[i].name !== providers[i].name ||
        a[i].visibility !== providers[i].visibility
    );
    if (sortingIsFinished && isRearranged) {
      setProviders(array);
    }
  }, [visible, hidden, disabled]);

  const sortables = [
    {
      name: "Visible",
      id: "visible",
      maxLength: 4,
      list: visible,
      setList: (list) => {
        setVisible(list.map((p) => ({ ...p, visibility: "visible" })));
      },
    },

    {
      name: "Hidden",
      id: "hidden",
      list: hidden,
      setList: (list) => {
        setHidden(list.map((p) => ({ ...p, visibility: "hidden" })));
      },
    },

    {
      name: "Disabled",
      id: "disabled",
      list: disabled,
      setList: (list) => {
        setDisabled(list.map((p) => ({ ...p, visibility: "disabled" })));
      },
    },
  ];

  const SortableLists = sortables.map((sortable) => (
    <SortableList
      openItem={openItem}
      setOpenItem={setOpenItem}
      key={sortable.id}
      {...sortable}
    />
  ));

  return (
    <div
      className={`flex-container page`}
      id={"iconsPage"}
      direction={"column"}
    >
      <Instructions />
      {SortableLists}
    </div>
  );
};

export default IconsPage;
