import { ReactSortable } from "react-sortablejs";
import IconsListItem from "./IconsListItem/IconsListItem";

function IconsPage_Sortable({ maxLength, list, setList, id }) {
  console.log("id: " + id);

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

  const name = id.charAt(0).toUpperCase() + id.slice(1);

  return (
    <div>
      <h2>{`${name}${maxLength ? `( max. ${maxLength})` : ""}`}</h2>
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
