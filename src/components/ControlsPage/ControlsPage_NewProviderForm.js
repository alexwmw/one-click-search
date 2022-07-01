function ControlsPage_NewProviderForm(props) {
  return (
    <div className="new-provider-fields" style={{ display: "none" }}>
      <div>
        <label>NAME: </label>
        <i className="far fa-question-circle info-icon"></i>
        <div className="tooltip">
          <span className="text">
            This name will appear on the 'Icon Order' tab
          </span>
        </div>
        <input type="text" id="new-name" placeholder="e.g. BBC" />
      </div>
      <div>
        <label>WEBSITE URL: </label>
        <i className="far fa-question-circle info-icon"></i>
        <div className="tooltip">
          <span className="text">
            Everything between and including 'http' and '/'
          </span>
        </div>
        <input
          type="text"
          id="new-url"
          placeholder="e.g. https://www.bbc.co.uk/"
        />
      </div>
      <div>
        <label>QUERY PATH: </label>
        <i className="far fa-question-circle info-icon"></i>
        <div className="tooltip">
          <span className="text">
            The search term wil be appended to this string
          </span>
        </div>
        <input type="text" id="new-queryPath" placeholder="e.g. search?q=" />
      </div>
      <div>
        <label>FAVICON URL: </label>
        <i className="far fa-question-circle info-icon"></i>
        <div className="tooltip">
          <span className="text">
            If left blank, the default favicon path will be used
          </span>
        </div>
        <input
          type="text"
          id="new-faviconUrl"
          placeholder='defaults to "url/favicon.ico"'
        />
      </div>
      <button id="button add-btn">Add</button>
      <button id="button cancel-btn">Cancel</button>
    </div>
  );
}

export default ControlsPage_NewProviderForm;
