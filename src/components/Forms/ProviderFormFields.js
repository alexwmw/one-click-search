import { useEffect } from "react";
import FormField from "/src/components/Forms/FormField";

function ProviderFormFields({ addNew, dispatch, values }) {
  const { name, hostname, queryPath, faviconUrl } = values;

  return (
    <>
      {addNew && (
        <FormField
          label={"Name"}
          classes={["undraggable"]}
          value={name}
          setValue={(value) => dispatch({ type: "SET_NAME", value: value })}
          formatField={() => dispatch({ type: "FORMAT_NAME" })}
        />
      )}
      <FormField
        label={"Hostname"}
        classes={["undraggable"]}
        value={hostname}
        setValue={(value) => dispatch({ type: "SET_HOSTNAME", value: value })}
        formatField={() => dispatch({ type: "FORMAT_HOSTNAME" })}
      />
      <FormField
        label={"Query path"}
        classes={["undraggable"]}
        value={queryPath}
        setValue={(value) => dispatch({ type: "SET_QUERYPATH", value: value })}
        formatField={() => dispatch({ type: "FORMAT_QUERYPATH" })}
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
      />
    </>
  );
}

export default ProviderFormFields;
