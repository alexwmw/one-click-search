import { useEffect } from "react";
import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import SortableItem from "./SortableItem";

function SortableSection(props) {
  const { name, id, maxLength, list, setList, openItem, setOpenItem } = props;

  const [undraggable, setUndraggable] = useState(false);

  /** Visible list must be at most {maxLength} items */
  const putHandler = (to, from) => {
    if (id == "visible") {
      return to.el.children.length < maxLength;
    }
    return true;
  };

  useEffect(() => {
    if (id == "visible") {
      const bool = list.length < 2;
      setUndraggable(bool);
    }
  }, [list]);

  return (
    <div>
      <h3 className="section-name">{`${name} Icons${
        maxLength ? ` (max. ${maxLength})` : ""
      }`}</h3>
      <ReactSortable
        id={id}
        list={list}
        setList={setList}
        group={{ name: "iconsList", put: putHandler }}
        tag={"ul"}
        animation={150}
        filter={".undraggable"}
        preventOnFilter={false}
        forceFallback={true}
        fallbackClass={"sortable-drag"}
      >
        {list.map((p) => (
          <SortableItem
            provider={p}
            key={p.name}
            openItem={openItem}
            setOpenItem={setOpenItem}
            isUndraggable={undraggable}
          ></SortableItem>
        ))}
      </ReactSortable>
    </div>
  );
}

export default SortableSection;
