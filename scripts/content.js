// the popup
const $QSpopup = $("<div></div>")
  .addClass("QSpopup")
  .attr({ id: "QSpopup" })
  .appendTo("body");

// background variables
var providers, // list of search provider objects
  hover, // bool; if cursor is hovering over element
  downTarget, // element that was clicked on
  to_showIcons, // timeout func
  to_hidePopup, // timeout func
  nVisible; // int; number of visible icons

// settings & params
const iconWidth = 26;
var hideDelay = 2;
var unhideDelay = 0.1;
var fadeDelay = 4;
var fadeTime = 3;
var hrefTarget = "_blank";

function setStylsheet(url) {
  var style = document.createElement("link");
  style.rel = "stylesheet";
  style.type = "text/css";
  style.href = chrome.extension.getURL(url);
  (document.head || document.documentElement).appendChild(style);
}

function initialiseIcon(searchProvider, parentEl) {
  var icon = new Image(24);
  $(icon)
    .addClass("QSicon")
    .attr({
      src: searchProvider.faviconUrl || searchProvider.url + "favicon.ico",
    }) // The visible icon; src is either a stored URL or default.
    .appendTo(
      $("<a />")
        .attr({
          href: "",
          target: hrefTarget,
        }) // ...wrapped in an anchor.
        .appendTo(parentEl)
    );
  if (searchProvider.visibility != "visible") {
    $(icon).hide().addClass("hiddenIcon"); // Hide hidden icons.
  }
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
  $QSpopup.fadeOut(fadeTime * 1000);
  if (hover) {
    $QSpopup.finish().animate({ opacity: "100" }).show();
  }
}

function bodyMousedown(e) {
  downTarget = e.target;
}

function CreateBodyMouseup(e, providers) {
  var retFunc = function (e) {
    if ($(downTarget).hasClass("QSicon") || $(downTarget).hasClass("QSpopup")) {
      return;
    }
    if (window.getSelection().toString() != "") {
      clearTimeout(to_hidePopup);
      setSearchHrefs(window.getSelection().toString(), providers);
      $QSpopup
        .finish()
        .animate({ opacity: "100" })
        .show()
        .css({
          top: e.pageY - 43,
          left: e.pageX - 13,
        });
      to_hidePopup = setTimeout(hidePopup, 4000);
    } else {
      $($QSpopup).finish().animate({ opacity: "100" }).hide();
    }
  };
  return retFunc;
}


chrome.storage.onChanged.addListener((changes, area) => {
  if (changes.providers.newValue) {
    providers = Object.values(changes.providers.newValue)
      .sort(compare)
      .filter((provider) => provider.visibility != "disabled");
    $(".QSpopup a").remove();
    $.each(providers, (i, provider) => initialiseIcon(provider, $QSpopup));

    nVisible = providers.filter(
      (provider) => provider.visibility == "visible"
    ).length;

    $QSpopup.css({
      width: iconWidth * nVisible,
    });
  }
});

chrome.storage.sync.get(defaults, (result) => {
  chrome.storage.sync.set(result);
  providers = Object.values(result.providers)
    .sort(compare)
    .filter((provider) => provider.visibility != "disabled");

  nVisible = providers.filter(
    (provider) => provider.visibility == "visible"
  ).length;

  $QSpopup.css({
    width: iconWidth * nVisible,
  });

  function bodyMousedown(e) {
    downTarget = e.target;
  }

  function bodyMouseup(e) {
    if ($(downTarget).hasClass("QSicon") || $(downTarget).hasClass("QSpopup")) {
      return;
    }
    if (window.getSelection().toString() != "") {
      clearTimeout(to_hidePopup);
      setSearchHrefs(window.getSelection().toString(), providers);
      $QSpopup
        .finish()
        .animate({ opacity: "100" })
        .show()
        .css({
          top: e.pageY - 43,
          left: e.pageX - 13,
        });
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
          width: iconWidth * providers.length,
        });
        $(".hiddenIcon").fadeIn();
      }
    }, unhideDelay * 1000);
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
    }, hideDelay * 1000);
    to_hidePopup = setTimeout(hidePopup, fadeDelay * 1000);
  }

  setStylsheet("stylesheets/popup.css");
  $.each(providers, (i, provider) => initialiseIcon(provider, $QSpopup));
  $("body").mousedown(bodyMousedown).mouseup(bodyMouseup);
  $QSpopup.mouseenter(popupMouseenter).mouseleave(popupMouseleave);
});
