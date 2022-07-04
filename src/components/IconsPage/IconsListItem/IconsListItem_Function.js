
function IconsListItem_Function({ func, key }) {
  return (
    <li data-id={key} className={"sortableItem"}>
      <img src={func.faviconUrl}></img>
      <span>{func.name}</span>
    </li>
  );
}

export default IconsListItem_Function;
