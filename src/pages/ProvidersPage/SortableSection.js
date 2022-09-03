import { ReactSortable } from "react-sortablejs";
import SortableItem from "./SortableItem";

function SortableSection({
  name,
  id,
  maxLength,
  list,
  setList,
  openItem,
  setOpenItem,
}) {
  /** Visible list must be at least 1 item */
  const pullHandler = (to, from) => {
    if (id == "visible") {
      return from.el.children.length > 1;
    }
    return true;
  };

  /** Visible list must be at most {maxLength} items */
  const putHandler = (to, from) => {
    if (id == "visible") {
      return to.el.children.length < maxLength;
    }
    return true;
  };

  return (
    <div>
      <h3 className="section-name">{`${name} Icons${
        maxLength ? ` (max. ${maxLength})` : ""
      }`}</h3>
      <ReactSortable
        id={id}
        list={list}
        setList={setList}
        group={{ name: "iconsList", put: putHandler, pull: pullHandler }}
        tag={"ul"}
        animation={150}
        filter={".undraggable"}
        preventOnFilter={false}
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
