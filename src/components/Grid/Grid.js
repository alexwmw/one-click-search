import TooltipProvider from "../ControlsPage/ControlElements/TooltipProvider";
import "./ControlsPage_Grid.less";
const Grid = ({ header, colTemplate, children }) => {
  return (
    <div
      style={colTemplate && { gridTemplateColumns: colTemplate }}
      className="ControlsGrid"
    >
      <h2 className={"header"}>{header}</h2>
      {children && <TooltipProvider>{children}</TooltipProvider>}
    </div>
  );
};

export default Grid;
