import "./Grid.less";
const Grid = ({ header, colTemplate, children }) => {
  const n = colTemplate.split(" ").length;
  return (
    <div
      style={colTemplate && { gridTemplateColumns: colTemplate }}
      className="Grid"
    >
      <h2 className={"header"}>{header}</h2>
      {children}
    </div>
  );
};

export default Grid;
