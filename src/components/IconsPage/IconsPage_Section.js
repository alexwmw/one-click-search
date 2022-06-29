import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import IconsLI from "./IconsListItem/IconsLI";

function IconsPage_Section({ max, providers, sectionName, listId }) {
  const maxStr = max ? `(max. ${max})` : "";
  const [list, setList] = useState(providers);

  const put = () => {
    if (sectionName == "Visible") {
      return list.length > 1;
    }
    return true;
  };

  const pull = () => {
    if (sectionName == "Visible") {
      return list.length < max;
    }
    return true;
  };

  return (
    <div>
      <h2>{`${sectionName} ${maxStr}`}</h2>
      <ReactSortable
        id={listId}
        group={{ name: "iconsList", put: put, pull: pull }}
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

export default IconsPage_Section;
