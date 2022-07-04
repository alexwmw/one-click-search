import IconsListItem_Function from "./IconsListItem_Function";
import IconsListItem_Provider from "./IconsListItem_Provider";
import "./IconsListItem.less";

function IconsListItem({ key, role, provider }) {
  if (role == "provider")
    return (
      <IconsListItem_Provider
        key={key}
        provider={provider}
      ></IconsListItem_Provider>
    );
  if (role == "function")
    return (
      <IconsListItem_Function
        key={key}
        func={provider}
      ></IconsListItem_Function>
    );
}

export default IconsListItem;
