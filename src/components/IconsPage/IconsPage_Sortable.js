import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import IconsLI from "./IconsListItem/IconsLI";

function IconsPage_Sortable({ maxLength, providerList, name, id }) {
  const maxStr = maxLength ? `(max. ${maxLength})` : "";
  const [list, setList] = useState(providerList);

  const pullHandler = (to, from) => {
    if (name == "Visible") {
      return from.el.children.length > 1;
    }
    return true;
  };

  const putHandler = (to, from) => {
    if (name == "Visible") {
      return to.el.children.length < maxLength;
    }
    return true;
  };

  return (
    <div>
      <h2>{`${name} ${maxStr}`}</h2>
      <ReactSortable
        id={id}
        group={{ name: "iconsList", put: putHandler, pull: pullHandler }}
        tag={"ul"}
        list={list}
        setList={setList}
        animation={150}
      >
        {list.map((providerObj) => (
          <IconsLI {...providerObj} key={providerObj.name} obj={providerObj} />
        ))}
      </ReactSortable>
    </div>
  );
}

export default IconsPage_Sortable;
