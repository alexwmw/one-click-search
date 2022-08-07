import "./Tab.less";

const Tab = (props) => {
  return (
    <div
      onClick={props.onClick}
      className={`tab ${props.selected ? "selected" : ""} ${props.border}`}
    >
      {props.children}
    </div>
  );
};

export default Tab;
