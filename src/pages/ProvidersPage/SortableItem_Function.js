import { useContext } from "react";
import ProvidersContext from "/src/contexts/ProvidersContext";

function SortableItem_Function({ sortIcon, name, key, id, setOpenItem }) {
  const { providers } = useContext(ProvidersContext);

  const faviconUrl = providers.filter((f) => f.name == name)[0].faviconUrl;

  return (
    <li
      id={id}
      key={key}
      data-id={name}
      className={"sortableItem"}
      onClick={(e) => setOpenItem(name)}
    >
      {sortIcon}
      <img src={faviconUrl}></img>
      <span>{name}</span>
    </li>
  );
}

export default SortableItem_Function;
