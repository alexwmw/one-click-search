import Toast from "./Toast";

function SavedAlert(props) {
  return (
    <Toast
      category={"success"}
      title={props.reference ? `${props.reference} was saved!` : "Saved!"}
      isOpen={props.isOpen}
    />
  );
}

export default SavedAlert;
