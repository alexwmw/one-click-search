function IconsListItem_Function(props) {
  return (
    <li data-id={props.key} data-object={props.obj}>
      <img src={props.faviconUrl}></img>
      <span>{props.name}</span>
    </li>
  );
}

export default IconsListItem_Function;
