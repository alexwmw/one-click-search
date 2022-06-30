const ControlsPage_Grid = (props) => {
  return (
    <div
      id="ControlsGrid"
      style={{
        display: "grid",
        gridTemplateColumns: "4fr 3fr 1fr",
        gap: "30px 12px",
        alignItems: "center",
      }}
    >
      <label>Number of seconds to fade-out the pop-up</label>
      <input id="popUp_fadeOutTime" max="10" min="0" step="0.5" type="range" />
      <span className="display" id="popUp_fadeOutTime-display">
        5.0 s
      </span>
      <label>Number of seconds of inactivity before fade-out begins</label>
      <input id="popUp_fadeDelay" max="10" min="0" step="0.5" type="range" />
      <span className="display" id="popUp_fadeDelay-display">
        5.0 s
      </span>
      <label>Number of seconds to hover before showing hidden icons</label>
      <input
        id="hiddenIcons_showDelay"
        max="10"
        min="0"
        step="0.5"
        type="range"
      />
      <span className="display" id="hiddenIcons_showDelay-display">
        1.0 s
      </span>
      <label>Open search in...</label>
      <select id="hrefTarget" type="select">
        <option>New tab</option>
        <option>Current tab</option>
      </select>
    </div>
  );
};

export default ControlsPage_Grid;
