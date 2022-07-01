import "./Spinner.less";

function Spinner(props) {
  return (
    <div className="spinner-container flex-container column center space-around">
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Spinner;
