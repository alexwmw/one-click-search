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
        {deleteHandler && (
          <FormButton
            type={"delete"}
            label={labels.delete}
            onClick={deleteHandler}
            classes={classes.delete}
          />
        )}
        {closeHandler && (
          <FormButton
            type={"close"}
            label={labels.close}
            onClick={closeHandler}
            classes={classes.close}
          />
        )}
        <FormButton
          type={"submit"}
          label={labels.submit}
          classes={classes.submit}
        />
      </div>
    </form>
  );
}

export default GenericForm;