import "./Button.less";

function Button({ icon, children }) {
  return (
    <button className="Button">
      {icon}
      {children}
    </button>
  );
}

export default Button;
