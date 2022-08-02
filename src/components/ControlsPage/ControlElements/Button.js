import "./Button.less";

function Button({ icon, children, onClick }) {
  return (
    <button onClick={onClick} className="Button">
      {icon}
      {children}
    </button>
  );
}

export default Button;
