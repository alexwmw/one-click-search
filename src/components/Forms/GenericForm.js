import ButtonArea from "../Buttons/ButtonArea";
import FormButton from "./FormButton";

function GenericForm(props) {
  const {
    closeHandler,
    deleteHandler,
    submitHandler,
    labels = {},
    classes = {},
    children,
  } = props;

  return (
    <form onClick={(e) => e.stopPropagation()} onSubmit={submitHandler}>
      {children}
      <div className={"flex-container row width-100 right"}>
        <div className="btn-area flex-container row right">
          {closeHandler && (
            <FormButton
              type={"close"}
              label={labels.close}
              onClick={closeHandler}
              classes={classes.close}
            />
          )}
          {deleteHandler && (
            <FormButton
              type={"delete"}
              label={labels.delete}
              onClick={deleteHandler}
              classes={classes.delete}
            />
          )}
          <FormButton
            type={"submit"}
            label={labels.submit}
            classes={classes.submit}
          />
        </div>
      </div>
    </form>
  );
}

export default GenericForm;
