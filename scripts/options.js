// Icons
const editIconClass = ["fas", "fa-ellipsis-v", "edit-icon"];

const defaultProviders = [
  {
    name: "Google",
    url: "https://www.google.com/",
    queryKey: "search?q=",
  },
  {
    name: "Wikipedia",
    url: "https://www.wikipedia.org/",
    queryKey: "/w/index.php?search=",
  },
  {
    name: "Wiktionary",
    url: "https://www.wiktionary.org/",
    queryKey: "/w/index.php?search=",
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

$(function () {
  const sortOptions = {
    group: "shared",
    animation: 200,
    ghostClass: "background-class",
    dragClass: "drag-class",
    forceFallback: true,
    onChoose: function (evt) {
      $(providerlist).css("cursor", "grabbing");
    }, // Run when you click
    onStart: function (evt) {
      $(providerlist).css("cursor", "grabbing");
    }, // Dragging started
    onEnd: function (evt) {
      $(providerlist).css("cursor", "grab");
    }, // Dragging ended
  };
  const providerlist = document.createElement("ul");
  new Sortable(providerlist, sortOptions);

  const hiddenList = document.createElement("ul");
  new Sortable(hiddenList, sortOptions);

  const disabledList = document.createElement("ul");
  new Sortable(disabledList, sortOptions);

  $("<h2>Visible</h2>").appendTo("body");
  $(providerlist).attr("id", "visible").appendTo("body");

  $("<h2>Hidden</h2>").appendTo("body");
  $(hiddenList).attr("id", "hidden").appendTo("body");

  $("<h2>Disabled</h2>").appendTo("body");
  $(disabledList).attr("id", "disabled").appendTo("body");

  //$("<button></button").text("Add").addClass("add-button").appendTo("body");

  for (var i = 0; i < defaultProviders.length; i++) {
    var inputs = $("<div></div>").addClass("input-fields");
    inputs.insertAfter(
      $("<i></i>")
        .addClass(editIconClass)
        .insertAfter(
          $(`<span>${defaultProviders[i].name}</span>`)
            .addClass("provider-name")
            .insertAfter(
              $("<img />")
                .addClass("favicon")
                .attr(
                  "src",
                  defaultProviders[i].faviconUrl ||
                    defaultProviders[i].url + "favicon.ico"
                )
                .appendTo(
                  $("<li></li>").addClass("provider-li").appendTo(providerlist)
                )
            )
        )
    );
    $(inputs)
      .append($("<br><label>URL: </label>"))
      .append(
        $("<input/>")
          .attr({ type: "text" })
          .addClass("li-input")
          .val(defaultProviders[i].url)
      )
      .append($("<br><label>QUERY PATH: </label>"))
      .append(
        $("<input/>")
          .attr({ type: "text" })
          .addClass("li-input")
          .val(defaultProviders[i].queryKey)
      )
      .append($("<br><label>FAVICON URL: </label>"))
      .append(
        $("<input/>")
          .attr({ type: "text" })
          .addClass("li-input")
          .val(defaultProviders[i].faviconUrl || "Default")
      );
  }

  $(".edit-icon").click(function (e) {
    $("li").not($(this).closest("li")).removeClass("expanded-li");
    $(this).closest("li").toggleClass("expanded-li");
  });
});
