import { useContext, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import ProvidersContext from "../../contexts/ProvidersContext";
import IconsListItem from "./IconsListItem/IconsListItem";

function IconsPage_Sortable({
  name,
  id,
  maxLength,
  list,
  setList,
  openItem,
  setOpenItem,
}) {
  const { providers, storeProviders } = useContext(ProvidersContext);

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
          <IconsListItem
            key={p.name}
            name={p.name}
            role={p.role}
            openItem={openItem}
            setOpenItem={setOpenItem}
          />
        ))}
      </ReactSortable>
    </div>
  );
}

export default IconsPage_Sortable;
