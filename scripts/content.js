// the popup
const $QSpopup = $("<div></div>")
  .addClass("QSpopup")
  .attr({ id: "QSpopup" })
  .appendTo("body");

// background variables
var searchProviders; // list of search provider objects
var hover; // bool; if cursor is hovering over element
var downTarget; // element that was clicked on
var to_showIcons; // timeout func
var to_hidePopup; // timeout func
var nVisible; // int; number of visible icons

// settings & params
const iconWidth = 26;
const targetStrLookup = {
  "New tab": "_blank",
  "Current tab": "_self",
};
const stylesheetPath = "stylesheets/popup.css";
var hideIconsDelay = 2;
var showIconsDelay = 0.1;
var hidePopupFadeDelay = 4;
var hidePopupFadeTime = 3;
var hrefTarget = "_blank";

function setStylsheet(url) {
  var style = document.createElement("link");
  style.rel = "stylesheet";
  style.type = "text/css";
  style.href = chrome.runtime.getURL(url);
  (document.head || document.documentElement).appendChild(style);
}

function initialiseIcon(provider, parentEl) {
  var icon = new Image(24);
  icon.src = provider.faviconUrl || provider.url + "favicon.ico";
  icon.classList.add("QSicon");
  var $a = $("<a />").attr({
    href: "",
    target: hrefTarget,
  });
  if (provider.visibility != "visible") {
    icon.classList.add("hiddenIcon");
  }
  if (provider.isFunc) {
    icon.src = chrome.runtime.getURL(provider.faviconUrl);
    $a.click(function (e) {
      e.preventDefault();
      document.execCommand(provider.execute);
      $QSpopup.hide().finish();
    });
  }
  $(parentEl).append($a.append(icon));
}

function setSearchHrefs(searchString, searchProviders) {
  for (var i = 0; i < searchProviders.length; i++) {
    $(".QSicon")
      .eq(i)
      .parent()
      .attr({
        href:
          searchProviders[i].url + searchProviders[i].queryKey + searchString,
      });
  }
}

function compare(a, b) {
  if (a.visibility == "visible" && a.visibility != b.visibility) {
    return -1;
  }
  if (b.visibility == "visible" && a.visibility != b.visibility) {
    return 1;
  }
  if (a.position < b.position) {
    return -1;
  }
  if (a.position > b.position) {
    return 1;
  }
  return 0;
}

function hidePopup() {
  $QSpopup.fadeOut(hidePopupFadeTime * 1000);
  if (hover) {
    $QSpopup.finish().animate({ opacity: "100" }).show();
  }
}

function checkIfSelection() {
  const selection = window.getSelection();
  if (selection != "") {
    const selectionType = selection.focusNode.nodeType;
    const selectionLength = selection.toString().length;
    return selectionType == Node.TEXT_NODE && selectionLength <= 1024;
  }
  return false;
}

function updateSearchProvidersList(providersObj) {
  searchProviders = Object.values(providersObj)
    .sort(compare)
    .filter((provider) => provider.visibility != "disabled");
}

function onProvidersChange(providersObj) {
  updateSearchProvidersList(providersObj);
  $(".QSpopup a").remove();
  $.each(searchProviders, (i, provider) => initialiseIcon(provider, $QSpopup));
  nVisible = searchProviders.filter(
    (provider) => provider.visibility == "visible"
  ).length;
  $QSpopup.css({
    width: iconWidth * nVisible,
  });
}

function bodyMousedown(e) {
  downTarget = e.target;
}

function bodyMouseup(e) {
  if ($(downTarget).hasClass("QSicon") || $(downTarget).hasClass("QSpopup")) {
    return;
  }
  if (checkIfSelection()) {
    clearTimeout(to_hidePopup);
    setSearchHrefs(window.getSelection().toString(), searchProviders);
    $QSpopup
      .finish()
      .animate({ opacity: "100" })
      .show()
      .css({
        top: e.pageY - 43,
        left: e.pageX - 13,
        width: iconWidth * nVisible,
      });
    $(".hiddenIcon").hide();
    to_hidePopup = setTimeout(hidePopup, 4000);
  } else {
    $($QSpopup).finish().animate({ opacity: "100" }).hide();
  }
}

function popupMouseenter(e) {
  hover = true;
  clearTimeout(to_hidePopup);
  $QSpopup.finish().animate({ opacity: "100" }).show();
  to_showIcons = setTimeout(() => {
    if (hover) {
      $QSpopup.css({
        width: iconWidth * searchProviders.length + 10,
      });
      $(".hiddenIcon").fadeIn();
    }
  }, showIconsDelay * 1000);
}

function popupMouseleave(e) {
  hover = false;
  clearTimeout(to_showIcons);
  clearTimeout(to_hidePopup);
  setTimeout(() => {
    if (!hover) {
      $QSpopup.css({
        width: iconWidth * nVisible,
      });
      $(".hiddenIcon").hide();
    }
  }, hideIconsDelay * 1000);
  var greaterDelay =
    hidePopupFadeDelay > hideIconsDelay ? hidePopupFadeDelay : hideIconsDelay;
  to_hidePopup = setTimeout(hidePopup, greaterDelay * 1000);
}

function addListeners(target, pairs) {
  Object.entries(pairs).forEach((entry) => {
    const [event, listener] = entry;
    target[event](listener);
  });
}

chrome.storage.sync.get(["providers", "options"], (result) => {
  showIconsDelay = result.options["hiddenIcons_showDelay"].value;
  hidePopupFadeDelay = result.options["popUp_fadeDelay"].value;
  hidePopupFadeTime = result.options["popUp_fadeOutTime"].value;
  hrefTarget = targetStrLookup[result.options["hrefTarget"].value];
  hideIconsDelay = hidePopupFadeDelay < 2 ? hidePopupFadeDelay : 2;
  onProvidersChange(result.providers);
  addListeners($("body"), {
    mousedown: bodyMousedown,
    mouseup: bodyMouseup,
  });
  addListeners($QSpopup, {
    mouseenter: popupMouseenter,
    mouseleave: popupMouseleave,
  });
  setStylsheet(stylesheetPath);
});
