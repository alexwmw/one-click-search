import clsx from "clsx";
import "./Tab.less";

const Tab = (props) => {
  return (
    <div
      onClick={props.onClick}
      id={props.id}
      className={clsx("tab", props.selected && "selected", props.border)}
    >
      {props.children}
    </div>
  );
};

export default Tab;
