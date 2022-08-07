import { error } from "jquery";

const FlexRow = ({ columns, colSpans = [], children }) => {
  let rowItems = [],
    i;

  if (children.length > columns) {
    throw new Error("Grid's child list cannot exceed than the grid's columns");
  }
  for (; i < columns; i++) {
    rowItems.push(
      <div style={colSpans[i] ? { columnSpan: colSpans[i] } : ""}>
        {children[i] && children[i]}
      </div>
    );
  }

  return <>{rowItems}</>;
};

export default FlexRow;
