import { useEffect } from "react";
import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import SortableItem from "./SortableItem";

function SortableSection(props) {
  const { name, id, maxLength, list, setList, openItem, setOpenItem } = props;

  // /** Visible list must be at most {maxLength} items */
  // const putHandler = (to, from) => {
  //   if (id == "visible") {
  //     return to.el.children.length < maxLength;
  //   }
  //   return true;
  // };

  return (
    <div>
      <h3 className="section-name">{`${name} Icons`}</h3>
      <ReactSortable
        id={id}
        list={list}
        setList={setList}
        // group={{ name: "iconsList", put: putHandler }}
        group={{ name: "iconsList" }}
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
          ></SortableItem>
        ))}
      </ReactSortable>
    </div>
  );
}

export default SortableSection;
