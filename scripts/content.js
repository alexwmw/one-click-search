const providers = [
  {
    name: "Google",
    url: "https://www.google.com/",
    queryKey: "search?q=",
  },
  {
    name: "Wikipedia",
    url: "https://www.wikipedia.org/",
    queryKey: "w/index.php?search=",
  },
  {
    name: "Wiktionary",
    url: "https://www.wiktionary.org/",
    queryKey: "w/index.php?search=",
  },
  {
    name: "Amazon",
    url: "https://www.amazon.co.uk/",
    queryKey: "s?k=",
  },
  {
    name: "eBay",
    url: "https://www.ebay.co.uk/",
    queryKey: "sch/i.html?_nkw=",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/",
    queryKey: "results?search_query=",
    faviconUrl:
      "https://m.youtube.com/static/apple-touch-icon-120x120-precomposed.png",
  },
  {
    name: "Twitter",
    url: "https://www.twitter.com/",
    queryKey: "search?q=",
  },
  {
    name: "Bing",
    url: "https://www.bing.com/",
    queryKey: "search?q=",
  },
  {
    name: "Gmail",
    url: "https://mail.google.com/",
    queryKey: "mail/u/0/#search/",
  },
  {
    name: "Reddit",
    url: "https://www.reddit.com/",
    queryKey: "search?q=",
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/",
    queryKey: "search/top?q=",
  },
];

const popup = $("<div></div>").addClass("QSpopup").appendTo("body");
const iconWidth = 26;
var hover;
var downTarget;
var showIcons;
var popupTimeout;

function setStylsheet(url) {
  var style = document.createElement("link");
  style.rel = "stylesheet";
  style.type = "text/css";
  style.href = chrome.extension.getURL(url);
  (document.head || document.documentElement).appendChild(style);
}

function initialiseIcon(provider, parent, hidden = false) {
  var icon = new Image(24);
  $(icon)
    .addClass("QSicon")
    .attr({
      src: provider.faviconUrl || provider.url + "favicon.ico",
    })
    .appendTo(
      $("<a />")
        .attr({
          href: "",
          target: "_blank",
        })
        .appendTo(parent)
    );
  if (hidden) {
    $(icon).hide().addClass("hiddenIcon");
  }
}

function setSearchHrefs(searchString) {
  for (var i = 0; i < providers.length; i++) {
    $(".QSicon")
      .eq(i)
      .parent()
      .attr({
        href: providers[i].url + providers[i].queryKey + searchString,
      });
  }
}

function hidePopup() {
  $(".QSpopup").fadeOut(2000);
  if (hover) {
    $(".QSpopup").finish().animate({ opacity: "100" }).show();
  }
}

function bodyMousedown(e) {
  downTarget = e.target;
}

function bodyMouseup(e) {
  if ($(downTarget).hasClass("QSicon") || $(downTarget).hasClass("QSpopup")) {
    return;
  }
  if (window.getSelection().toString() != "") {
    clearTimeout(popupTimeout);
    setSearchHrefs(window.getSelection().toString());
    $(popup)
      .finish()
      .animate({ opacity: "100" })
      .show()
      .css({
        top: e.pageY - 43,
        left: e.pageX - 13,
      });
    popupTimeout = setTimeout(hidePopup, 4000);
  } else {
    $(popup).finish().animate({ opacity: "100" }).hide();
  }
}

function popupMouseenter(e) {
  hover = true;
  clearTimeout(popupTimeout);
  $(".QSpopup").finish().animate({ opacity: "100" }).show();
  showIcons = setTimeout(() => {
    if (hover) {
      $(".QSpopup").css({
        width: iconWidth * providers.length,
      });
      $(".hiddenIcon").fadeIn();
    }
  }, 3000);
}

function popupMouseleave(e) {
  hover = false;
  clearTimeout(showIcons);
  clearTimeout(popupTimeout);
  setTimeout(() => {
    if (!hover) {
      $(".QSpopup").css({
        width: iconWidth,
      });
      $(".hiddenIcon").hide();
    }
  }, 1000);
  popupTimeout = setTimeout(hidePopup, 4000);
}

setStylsheet("stylesheets/popup.css");

for (var i = 0; i < providers.length; i++) {
  initialiseIcon(providers[i], popup, i > 0);
}

$("body").mousedown(bodyMousedown).mouseup(bodyMouseup);

$(".QSpopup").mouseenter(popupMouseenter).mouseleave(popupMouseleave);
