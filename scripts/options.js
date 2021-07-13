// Icons
const editIconClass = ["fas", "fa-ellipsis-v", "edit-icon"];
const maxVisible = 4;

function compare(a, b) {
  if (a.position < b.position) {
    return -1;
  }
  if (a.position > b.position) {
    return 1;
  }
  return 0;
}

/*var providers = {
  Google: {
    name: "Google",
    url: "https://www.google.com/",
    queryKey: "search?q=",
    visibility: "visible",
    position: 0,
  },
  Wikipedia: {
    name: "Wikipedia",
    url: "https://www.wikipedia.org/",
    queryKey: "w/index.php?search=",
    visibility: "visible",
    position: 1,
  },
  Wiktionary: {
    name: "Wiktionary",
    url: "https://www.wiktionary.org/",
    queryKey: "w/index.php?search=",
    visibility: "visible",
    position: 2,
  },
  Amazon: {
    name: "Amazon",
    url: "https://www.amazon.co.uk/",
    queryKey: "s?k=",
    visibility: "hidden",
    position: 3,
  },
  eBay: {
    name: "eBay",
    url: "https://www.ebay.co.uk/",
    queryKey: "sch/i.html?_nkw=",
    visibility: "hidden",
    position: 4,
  },
  YouTube: {
    name: "YouTube",
    url: "https://www.youtube.com/",
    queryKey: "results?search_query=",
    faviconUrl:
      "https://m.youtube.com/static/apple-touch-icon-120x120-precomposed.png",
    visibility: "hidden",
    position: 5,
  },
  Twitter: {
    name: "Twitter",
    url: "https://www.twitter.com/",
    queryKey: "search?q=",
    visibility: "disabled",
    position: 6,
  },
  Bing: {
    name: "Bing",
    url: "https://www.bing.com/",
    queryKey: "search?q=",
    visibility: "disabled",
    position: 7,
  },
  Gmail: {
    name: "Gmail",
    url: "https://mail.google.com/",
    queryKey: "mail/u/0/#search/",
    visibility: "hidden",
    position: 8,
  },
  Reddit: {
    name: "Reddit",
    url: "https://www.reddit.com/",
    queryKey: "search?q=",
    visibility: "hidden",
    position: 9,
  },
  Facebook: {
    name: "Facebook",
    url: "https://www.facebook.com/",
    queryKey: "search/top?q=",
    visibility: "disabled",
    position: 10,
  },
};*/

chrome.storage.sync.get(["providers"], function (r) {
  var providers = r.providers;
  $(function () {
    const sortOptions = {
      group: "shared",
      animation: 200,
      ghostClass: "background-class",
      dragClass: "drag-class",
      forceFallback: true,
      onChoose: function (evt) {
        $("body").css("cursor", "grabbing");
      }, // Run when you click
      onStart: function (evt) {
        $("body").css("cursor", "grabbing");
      }, // Dragging started
      onEnd: function (evt) {
        $("body").css("cursor", "default");
        providers[$(evt.item).attr("id")].visibility = $(evt.to).attr("id");
        $(evt.to)
          .find("li")
          .each(function (i, item) {
            let provider = providers[$(item).attr("id")];
            provider.position = i;
            console.log(provider.name, provider.position);
          });
        chrome.storage.sync.set({ providers: providers });
      }, // Dragging ended
    };
    const visible = document.createElement("ul");
    new Sortable(visible, {
      ...sortOptions,
      ...{
        group: {
          name: "shared",
          pull: function (to, from) {
            return from.el.children.length > 2;
          },
          put: function (to) {
            return to.el.children.length < maxVisible;
          },
        },
      },
    });

    const hidden = document.createElement("ul");
    new Sortable(hidden, sortOptions);

    const disabled = document.createElement("ul");
    new Sortable(disabled, sortOptions);

    const lists = { visible: visible, hidden: hidden, disabled: disabled };

    $(`<h2>Visible (max. ${maxVisible})</h2>`).appendTo("body");
    $(visible).attr("id", "visible").appendTo("body");

    $("<h2>Hidden</h2>").appendTo("body");
    $(hidden).attr("id", "hidden").appendTo("body");

    $("<h2>Disabled</h2>").appendTo("body");
    $(disabled).attr("id", "disabled").appendTo("body");

    //$("<button></button").text("Add").addClass("add-button").appendTo("body");

    $.each(Object.values(providers).sort(compare), function (i, provider) {
      console.log(provider.position);
      var $inputs = $("<div></div>").addClass("input-fields");
      $inputs.insertAfter(
        $("<i></i>")
          .addClass(editIconClass)
          .insertAfter(
            $(`<span>${provider.name}</span>`)
              .addClass("provider-name")
              .insertAfter(
                $("<img />")
                  .addClass("favicon")
                  .attr(
                    "src",
                    provider.faviconUrl || provider.url + "favicon.ico"
                  )
                  .appendTo(
                    $("<li></li>")
                      .addClass("provider-li")
                      .attr({ id: provider.name })
                      .appendTo(lists[provider.visibility])
                  )
              )
          )
      );
      $inputs
        .append($("<br><label>URL: </label>"))
        .append(
          $("<input/>")
            .attr({ type: "text" })
            .addClass("li-input")
            .val(provider.url)
        )
        .append($("<br><label>QUERY PATH: </label>"))
        .append(
          $("<input/>")
            .attr({ type: "text" })
            .addClass("li-input")
            .val(provider.queryKey)
        )
        .append($("<br><label>FAVICON URL: </label>"))
        .append(
          $("<input/>")
            .attr({ type: "text", placeholder: "default (.../favicon.ico)" })
            .addClass("li-input")
            .val(provider.faviconUrl)
        );
    });

    $(".edit-icon").click(function (e) {
      $("li").not($(this).closest("li")).removeClass("expanded-li");
      $(this).closest("li").toggleClass("expanded-li");
    });
  });
});
