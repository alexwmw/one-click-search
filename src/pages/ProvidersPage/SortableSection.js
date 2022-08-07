import { ReactSortable } from "react-sortablejs";
import SortableItem from "./SortableItem";
import SortableItem_Function from "./SortableItem_Function";
import SortableItem_Provider from "./SortableItem_Provider";

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
      <h2>{`${name}${maxLength ? ` (max. ${maxLength})` : ""}`}</h2>
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
            key={p.name}
            name={p.name}
            role={p.role}
            openItem={openItem}
            setOpenItem={setOpenItem}
          ></SortableItem>
        ))}
      </ReactSortable>
    </div>
  );
}

export default SortableSection;
