const OCSReducer = (state, action) => {
  switch (action.type) {
    case "SET_CLICK_PROPERTIES":
      return { ...state, text: action.text, x: action.x, y: action.y };
    case "DISPLAY_OCS":
      return {
        ...state,
        isVisible: true,
        fade: true,
        position: { left: state.x, top: state.y },
      };
    case "SHOW_OCS":
    case "CLICK_ON_OCS":
      return { ...state, isVisible: true };
    case "MOUSEENTER_POPUP":
      return { ...state, isVisible: true };
    case "CLICK_OFF_OCS":
    case "HIDE_OCS":
      return { ...state, isVisible: false, fade: false, text: "" };
    case "CLICK_OCS_ICON":
      return { ...state, isVisible: true, fade: false };
    case "FADE_POPUP":
      return { ...state, isVisible: false, fade: true, };
    case "SHOW_HIDDEN_ICONS":
      return { ...state, showHidden: true };
    case "HIDE_HIDDEN_ICONS":
      return { ...state, showHidden: false };
  }
};

export default OCSReducer;
