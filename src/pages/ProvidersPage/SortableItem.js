import "./SortableItem.less";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort as sortIcon } from "@fortawesome/free-solid-svg-icons";
import SortableItem_Provider from "./SortableItem_Provider";
import SortableItem_Function from "./SortableItem_Function";

function SortableItem(props) {
  const SortIcon = <FontAwesomeIcon className="sortIcon" icon={sortIcon} />;
  if (props.role == "provider")
    return (
      <SortableItem_Provider
        sortIcon={SortIcon}
        {...props}
      ></SortableItem_Provider>
    );
  if (props.role == "function")
    return (
      <SortableItem_Function
        sortIcon={SortIcon}
        {...props}
      ></SortableItem_Function>
    );
}

export default SortableItem;
