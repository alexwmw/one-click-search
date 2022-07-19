//import "./ControlsPage_Section.less";
const ControlsPage_Section = ({ header, children }) => {
  return (
    <div className="ControlsSection flex-container column width-100">
      <h2 className={"header"}>{header}</h2>
      {children}
    </div>
  );
};

export default ControlsPage_Section;
