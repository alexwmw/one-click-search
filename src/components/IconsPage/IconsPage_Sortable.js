import { ReactSortable } from "react-sortablejs";
import IconsListItem from "./IconsListItem/IconsListItem";

function IconsPage_Sortable({ maxLength, list, setList, name, id }) {
  const maxStr = maxLength ? `(max. ${maxLength})` : "";

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
        {list.map((provider) => (
          <IconsListItem
            key={provider.name}
            role={provider.role}
            provider={provider}
          />
        ))}
      </ReactSortable>
    </div>
  );
}

export default IconsPage_Sortable;
