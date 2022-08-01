import IconsListItem_Function from "./IconsListItem_Function";
import IconsListItem_Provider from "./IconsListItem_Provider";
import "./IconsListItem.less";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort as sortIcon } from "@fortawesome/free-solid-svg-icons";

function IconsListItem(props) {
  const SortIcon = <FontAwesomeIcon className="sortIcon" icon={sortIcon} />;
  if (props.role == "provider")
    return (
      <IconsListItem_Provider
        sortIcon={SortIcon}
        {...props}
      ></IconsListItem_Provider>
    );
  if (props.role == "function")
    return (
      <IconsListItem_Function
        sortIcon={SortIcon}
        {...props}
      ></IconsListItem_Function>
    );
}

export default IconsListItem;
