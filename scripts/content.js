// the popup
const $QSpopup = $("<div></div>")
  .addClass("QSpopup")
  .attr({ id: "QSpopup" })
  .appendTo("body");

// background variables
var searchProviders; // list of search provider objects
var localProviderObject;
var hover; // bool; if cursor is hovering over element
var tabVisible = true; // bool; if page/tab is visible to the user
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
      $QSpopup.finish().hide();
    });
  }
  $(parentEl).append($a.append(icon));
}

const gotoObj = {
  GoTo: {
    name: "GoTo",
    faviconUrl: chrome.runtime.getURL("/images/goto.ico"),
    visibility: "disabled",
    position: -1,
    url: "",
    queryKey: "",
  },
};

function setSearchHrefs(searchString, searchProviders) {
  for (var i = 0; i < searchProviders.length; i++) {
    $(".QSicon")
      .eq(i)
      .parent()
      .attr({
        href: searchString.startsWith("http")
          ? searchString
          : searchProviders[i].url +
            searchProviders[i].queryKey +
            encodeURIComponent(searchString),
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
    const nodeType = selection.focusNode.nodeType;
    const hasInputChild = $(selection.focusNode).find("input").length;
    const selectionLength = selection.toString().length;
    return (
      (nodeType == Node.TEXT_NODE || hasInputChild) &&
      selectionLength > 0 &&
      selectionLength <= 1024
    );
  }
  return false;
}

function updateSearchProvidersList(providersObj) {
  searchProviders = Object.values(providersObj)
    .sort(compare)
    .filter((provider) => provider.visibility != "disabled");
}

function onProvidersChange(providersObj) {
  localProviderObject = { ...providersObj, ...gotoObj };
  updateSearchProvidersList(localProviderObject);
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
    $QSpopup.finish().hide();
    return;
  }
  if (checkIfSelection()) {
    clearTimeout(to_hidePopup);
    if (window.getSelection().toString().startsWith("http")) {
      gotoObj.GoTo.visibility = "visible";
    } else {
      gotoObj.GoTo.visibility = "disabled";
    }
    onProvidersChange(localProviderObject);
    setSearchHrefs(window.getSelection().toString(), searchProviders);
    $QSpopup
      .finish()
      .animate({ opacity: "100" })
      .show()
      .css({
        top: e.pageY - 40,
        left: e.pageX - 13,
        width: iconWidth * nVisible,
      });
    $(".hiddenIcon").hide();
    to_hidePopup = setTimeout(hidePopup, 4000);
  } else {
    $($QSpopup).finish().css({ opacity: "100" }).hide();
  }
}

function popupMouseenter(e) {
  hover = true;
  clearTimeout(to_hidePopup);
  $QSpopup.finish().animate({ opacity: "100" }).show();
  to_showIcons = setTimeout(() => {
    if (hover && tabVisible) {
      $QSpopup.css({
        width: iconWidth * searchProviders.length,
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
    if (!hover || !tabVisible) {
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
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") {
      tabVisible = true;
    } else {
      tabVisible = false;
    }
  });
  addListeners($("body"), {
    mousedown: bodyMousedown,
    mouseup: bodyMouseup,
  });
  addListeners($QSpopup, {
    mouseenter: popupMouseenter,
    mouseleave: popupMouseleave,
  });
  /*  
  addListeners($("a"), {
    click: (e) => {
      $QSpopup.hide().finish();
    },
  });
  */
  setStylsheet(stylesheetPath);
});
