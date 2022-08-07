import "./Card.less";
function Card(props) {
  return <div className="card">{props.children}</div>;
}

export default Card;
