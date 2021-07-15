$(() => {
  const editIconClassList = ["fas", "fa-ellipsis-v", "edit-icon"],
    maxVisible = 4,
    $listsPage = $("#lists-page");

  function compare(a, b) {
    if (a.position < b.position) {
      return -1;
    }
    if (a.position > b.position) {
      return 1;
    }
    return 0;
  }

  chrome.storage.sync.get(["providers"], (r) => {
    const providersObj = r.providers,
      providersList = Object.values(providersObj).sort(compare),
      sortOptions = {
        group: "shared",
        animation: 200,
        ghostClass: "background-class",
        dragClass: "drag-class",
        forceFallback: true,
      },
      sortFunctions = {
        onChoose: (evt) => $listsPage.css("cursor", "grabbing"), // Run when you click
        onUnchoose: (evt) => $listsPage.css("cursor", "default"),
        onEnd: (evt) => {
          $listsPage.css("cursor", "default");
          providersObj[$(evt.item).attr("id")].visibility = $(evt.to).attr(
            "id"
          );
          $(evt.to)
            .find("li")
            .each((i, item) => {
              let provider = providersObj[$(item).attr("id")];
              provider.position = i;
            });
          chrome.storage.sync.set({ providers: providersObj });
        }, // Dragging ended
      },
      visibleGroupOptions = {
        name: "shared",
        pull: function (to, from) {
          return from.el.children.length > 2;
        },
        put: function (to) {
          return to.el.children.length < maxVisible;
        },
      },
      ul = {
        visible: document.createElement("ul"),
        hidden: document.createElement("ul"),
        disabled: document.createElement("ul"),
      };

    $("<h2 />").html(`Visible (max. ${maxVisible})`).appendTo($listsPage);
    $(ul.visible).attr("id", "visible").appendTo($listsPage);

    $("<h2>Hidden</h2>").appendTo($listsPage);
    $(ul.hidden).attr("id", "hidden").appendTo($listsPage);

    $("<h2>Disabled</h2>").appendTo($listsPage);
    $(ul.disabled).attr("id", "disabled").appendTo($listsPage);

    new Sortable(ul.visible, {
      ...sortOptions,
      ...{
        group: visibleGroupOptions,
      },
      ...sortFunctions,
    });
    new Sortable(ul.hidden, { ...sortOptions, ...sortFunctions });
    new Sortable(ul.disabled, { ...sortOptions, ...sortFunctions });

    $.each(providersList, function (i, provider) {
      const $inputs = $("<div />").addClass("input-fields");
      $inputs.insertAfter(
        $("<i />")
          .addClass(editIconClassList)
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
                    $("<li />")
                      .addClass("provider-li")
                      .attr({ id: provider.name })
                      .appendTo(ul[provider.visibility])
                  )
              )
          )
      );

      var url = $("<input/>")
        .attr({ type: "text" })
        .addClass(["li-input", "provider-url"])
        .data("key", "url")
        .val(provider.url);
      var queryKey = $("<input/>")
        .attr({ type: "text" })
        .addClass(["li-input", "provider-queryKey"])
        .data("key", "queryKey")
        .val(provider.queryKey);
      var faviconUrl = $("<input/>")
        .attr({ type: "text", placeholder: "Default <URL>/favicon.ico" })
        .addClass(["li-input", "provider-favicon-url"])
        .data("key", "faviconUrl")
        .val(provider.faviconUrl);
      var $restoreBtn = $(
        "<button><i class='fas fa-undo'> </i> Restore</button>"
      ).addClass("li-btn restore-btn");
      var $deleteBtn = $(
        "<button><i class='fas fa-trash'> </i> Delete</button>"
      )
        .addClass("li-btn delete-btn")
        .addClass(!provider.userAdded ? "hidden-btn" : null);

      $inputs
        .append($("<label>URL: </label>"))
        .append(url)
        .append($("<br><label>QUERY PATH: </label>"))
        .append(queryKey)
        .append($("<br><label>FAVICON URL: </label>"))
        .append(faviconUrl)
        .append($deleteBtn)
        .append($restoreBtn);

      $restoreBtn.click(function (e) {});
      $deleteBtn.click(function (e) {});
    });

    const $input = $("input"),
      $tab = $(".tab");

    $input.each(function (i, el) {
      $(el).attr({ tabindex: "-1" });
    });

    $input.change(function (e) {
      var $providerEl = $(this).closest(".provider-li");
      var $this = $(this);
      var providerId = $providerEl.attr("id");
      var key = $(this).data("key");
      var newValue = $(this).val();
      providersObj[providerId][key] = newValue;
      chrome.storage.sync.set({ providers: providersObj }, function () {
        $providerEl
          .animate({ width: "95%" }, 150, "swing")
          .animate({ width: "90%" }, 150, "swing");
        $("#saved")
          .animate({ opacity: "1" }, 200, "swing")
          .animate({ opacity: "0" }, 800, "swing");
      });
    });

    $input.click(function (e) {
      // do something
    });

    $tab.mousedown(function (e) {
      $(this).animate({ opacity: "0.6" }, 100, "swing");
      if (!$(this).hasClass("active")) {
        $tab.toggleClass("active");
        $(".page").toggle();
      }
    });

    $tab.mouseup(function (e) {
      $(this).animate({ opacity: "1" }, 100, "swing");
    });

    $(".edit-icon").mousedown(function (e) {
      let $closestLi = $(this).closest("li");

      $("li").not($closestLi).removeClass("expanded-li");
      $closestLi.toggleClass("expanded-li");
    });
  });
});
