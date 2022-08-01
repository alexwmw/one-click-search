import IconsListItem_Function from "./IconsListItem_Function";
import IconsListItem_Provider from "./IconsListItem_Provider";
import "./IconsListItem.less";

<<<<<<< HEAD
function IconsListItem(props) {
  if (props.role == "provider")
    return <IconsListItem_Provider {...props}></IconsListItem_Provider>;
  if (props.role == "function")
    return <IconsListItem_Function {...props}></IconsListItem_Function>;
=======
function IconsListItem({ key, role, provider, visibilityList }) {
  if (role == "provider")
    return (
      <IconsListItem_Provider
        key={key}
        provider={provider}
        visibilityList={visibilityList}
      ></IconsListItem_Provider>
    );
  if (role == "function")
    return (
      <IconsListItem_Function
        key={key}
        func={provider}
      ></IconsListItem_Function>
    );
>>>>>>> 3722ec5cc4534d68dfa53cac1a7bf3951a7d83f6
}

export default IconsListItem;
