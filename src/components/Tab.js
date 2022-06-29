const Tab = (props) => {
  return (
    <div
      onClick={props.onClick}
      className={`tab ${props.selected && "selected"}`}
    >
      {props.children}
    </div>
  );
};

export default Tab;
