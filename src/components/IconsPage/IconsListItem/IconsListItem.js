import IconsListItem_Function from "./IconsListItem_Function";
import IconsListItem_Provider from "./IconsListItem_Provider";
import "./IconsListItem.less";

function IconsListItem(props) {
  if (props.role == "provider")
    return <IconsListItem_Provider {...props}></IconsListItem_Provider>;
  if (props.role == "function")
    return <IconsListItem_Function {...props}></IconsListItem_Function>;
}

export default IconsListItem;
