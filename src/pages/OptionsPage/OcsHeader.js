import "./OcsHeader.less";

function Header(props) {
  return (
    <div className="ocs-header">
      <img src={"/icons/icon16.png"}></img>
      <h1>One Click Search</h1>
      {props.children}
    </div>
  );
}

export default Header;
