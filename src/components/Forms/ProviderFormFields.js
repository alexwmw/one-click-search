import FormField from "../../components/Forms/FormField";

function ProviderFormFields({ addNew, dispatch, values, tooltips }) {
  const { name, hostname, queryPath, faviconUrl } = values;

  return (
    <>
      {addNew && (
        <FormField
          label={"Name"}
          classes={["undraggable"]}
          value={name}
          required={true}
          setValue={(value) => dispatch({ type: "SET_NAME", value: value })}
          formatField={() => dispatch({ type: "FORMAT_NAME" })}
          tooltipText={"A unique name for the search provider"}
          showTooltip={tooltips}
        />
      )}
      <FormField
        label={"Hostname"}
        classes={["undraggable"]}
        value={hostname}
        required={true}
        setValue={(value) => dispatch({ type: "SET_HOSTNAME", value: value })}
        formatField={() => dispatch({ type: "FORMAT_HOSTNAME" })}
        tooltipText={"A website address such as www.example.com"}
        showTooltip={tooltips}
      />
      <FormField
        label={"Query path"}
        classes={["undraggable"]}
        value={queryPath}
        required={true}
        setValue={(value) => dispatch({ type: "SET_QUERYPATH", value: value })}
        formatField={() => dispatch({ type: "FORMAT_QUERYPATH" })}
        tooltipText={"Include the $TEXT$ placeholder. E.g. search?q=$TEXT$"}
        showTooltip={tooltips}
      />
      <FormField
        label={"Favicon URL"}
        classes={["undraggable"]}
        value={faviconUrl}
        placeholder={"Default"}
        setValue={(value) => dispatch({ type: "SET_FAVICONURL", value: value })}
        formatFields={() =>
          dispatch({
            type: "FORMAT_FAVICONURL",
          })
        }
        tooltipText={
          "If left blank, this will default to: hostname/favicon.ico"
        }
        showTooltip={tooltips}
      />
    </>
  );
}

export default ProviderFormFields;
