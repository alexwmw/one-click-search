function IconsFunctionLI(props) {
  return (
    <li>
      <img src={props.faviconUrl}></img>
      <span>{props.name}</span>
    </li>
  );
}

export default IconsFunctionLI;
