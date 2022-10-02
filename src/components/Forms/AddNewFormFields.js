import { useState } from "react";
import parseSearchUrl from "../../modules/ParseSearchUrl";
import Button from "../Buttons/Button";
import Alert from "../Modals/Alert";
import FormField from "./FormField";

function AddNewFormFields({ dispatch, name, tooltips }) {
  const [searchString, setSearchString] = useState("");
  const [removeParameters, setRemoveParameters] = useState(true);
  const [alertIsOpen, setAlertIsOpen] = useState(false);
  const [alertStr, setAlertStr] = useState("");

  const onParseSuccess = (name, hostname, queryPath) => {
    dispatch({
      type: "SET_ALL",
      name: name,
      hostname: hostname,
      queryPath: queryPath,
      faviconUrl: "",
    });
    dispatch({
      type: "FORMAT_ALL",
    });
    setSearchString("");
  };

  const onParseError = (errorMsg) => {
    setAlertStr(errorMsg);
    setAlertIsOpen(true);
  };

  const parseClickHandler = () =>
    parseSearchUrl(
      searchString,
      removeParameters,
      onParseSuccess,
      onParseError
    );

  const checkHandler = (e) => {
    setRemoveParameters(e.target.checked);
  };

  return (
    <>
      <Alert
        classes="new-provider-error-alert"
        isOpen={alertIsOpen}
        title={"Error"}
        body={alertStr}
        onClose={() => setAlertIsOpen(false)}
        hasTitleBar={true}
      />
      <p>
        To add a new search provider, go to a website that has a search bar and
        search for the word <strong>$TEXT$</strong> and then paste the resulting
        URL in the <strong>Search URL</strong> field.
      </p>
      <p>
        Then click <strong>Parse</strong> to auto-fill the form fields below.
      </p>
      <p>Alternatively, fill in the fields manually.</p>
      <hr />
      <h3>Auto-fill</h3>
      <FormField
        label={"Search URL"}
        classes={["undraggable"]}
        value={searchString}
        required={false}
        setValue={setSearchString}
      >
        <Button
          type={"button"}
          onClick={parseClickHandler}
          classes={["parse-btn", searchString === "" && "disabled"]}
        >
          Parse
        </Button>
      </FormField>
      <span className="checkbox-row">
        <input
          type="checkbox"
          checked={removeParameters}
          onChange={checkHandler}
        />
        <label>Remove additional query string parameters when parsing</label>
      </span>
      <hr />
      <h3>New provider details</h3>
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
    </>
  );
}

export default AddNewFormFields;
