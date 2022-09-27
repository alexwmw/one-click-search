import "./Header.less";

function Header(props) {
  return (
    <div className="ocs-header">
      <img src={"/icons/icon_high-res.png"}></img>
      <h1>One Click Search</h1>
      {props.children}
    </div>
  );
}

export default Header;
