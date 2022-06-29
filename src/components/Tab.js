import { FlexTab } from "./basic-components/BasicStyledComponents";

const Tab = (props) => {
  return (
    <FlexTab
      onClick={props.onClick}
      className={props.selected && "selected active activeTab"}
    >
      {props.children}
    </FlexTab>
  );
};

export default Tab;
