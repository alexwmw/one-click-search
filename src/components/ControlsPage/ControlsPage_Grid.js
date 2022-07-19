import TooltipProvider from "./ControlElements/TooltipProvider";
import "./ControlsPage_Grid.less";
const ControlsPage_Grid = ({ header, children }) => {
  return (
    <div className="ControlsGrid">
      <h2 className={"header"}>{header}</h2>
      <TooltipProvider>{children}</TooltipProvider>
    </div>
  );
};

export default ControlsPage_Grid;
