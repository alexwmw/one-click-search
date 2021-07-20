$(() => {
  const editIconClassList = ["fas", "fa-ellipsis-v", "edit-icon"];
  const helpIconClassList = ["far", "fa-question-circle", "info-icon"];
  const restoreIconClass = "fa-trash-restore-alt";
  const addIconClass = "fa-plus-circle";
  const maxVisible = 4;
  const $listsPage = $("#lists-page");
  const $settingsPage = $("#settings-page");
  const listElements = {
    visible: document.createElement("ul"),
    hidden: document.createElement("ul"),
    disabled: document.createElement("ul"),
  };
  const sortableOpts = {
    group: "shared",
    animation: 200,
    ghostClass: "background-class",
    dragClass: "drag-class",
    forceFallback: true,
  };
  const sortableFuncs = (providersObj) => {
    return {
      onChoose: (evt) => $listsPage.css("cursor", "grabbing"), // Run when you click
      onUnchoose: (evt) => $listsPage.css("cursor", "default"),
      onEnd: (evt) => {
        $listsPage.css("cursor", "default");
        providersObj[$(evt.item).attr("id")].visibility = $(evt.to).attr("id");
        $(evt.to)
          .find("li")
          .each((i, item) => {
            let provider = providersObj[$(item).attr("id")];
            provider.position = i;
            $(item)
              .find(".delete-btn")
              .data("providerVisibility", provider.visibility);
          });
        chrome.storage.sync.set({ providers: providersObj });
      }, // Dragging ended
    };
  };
  const visibleGrpOpts = {
    name: "shared",
    pull: function (to, from) {
      return from.el.children.length > 2;
    },
    put: function (to) {
      return to.el.children.length < maxVisible;
    },
  };

  function appendListsToPage() {
    $("<h2 />").html(`Visible (max. ${maxVisible})`).appendTo($listsPage);
    $(listElements.visible).attr("id", "visible").appendTo($listsPage);

    $("<h2>Hidden</h2>").appendTo($listsPage);
    $(listElements.hidden).attr("id", "hidden").appendTo($listsPage);

    $("<h2>Disabled</h2>").appendTo($listsPage);
    $(listElements.disabled).attr("id", "disabled").appendTo($listsPage);
    $("<div/>").css({ height: "30px" }).appendTo($listsPage);
  }

  function compare(a, b) {
    if (a.position < b.position) {
      return -1;
    }
    if (a.position > b.position) {
      return 1;
    }
    return 0;
  }

  function produceInputEl(property, provider = false) {
    var $element = $("<input/>")
      .attr({ type: "text" })
      .data("key", `${property}`);
    if (provider) {
      $element
        .addClass(["li-input", `provider-${property}`])
        .val(provider[property]);
    } else {
      $element.attr({ id: `new-${property}` });
    }
    return $element;
  }

  function createProviderLi(i, provider) {
    const $providerLi = $("<li />")
      .addClass("provider-li")
      .attr({ id: provider.name })
      .appendTo(listElements[provider.visibility]);
    const $faviconImg = $("<img />")
      .addClass("favicon")
      .attr("src", provider.faviconUrl || provider.url + "favicon.ico");
    const $nameSpan = $(`<span>${provider.name}</span>`).addClass(
      "provider-name"
    );
    $providerLi.append($faviconImg).append($nameSpan);
    if (!provider.isFunc) {
      const $editIcon = $("<i />").addClass(editIconClassList);
      const $inputs = $("<div />").addClass("input-fields");
      const $url = produceInputEl("url", provider);
      const $queryKey = produceInputEl("queryKey", provider);
      const $faviconUrl = produceInputEl("faviconUrl", provider).attr(
        "placeholder",
        "default: url/favicon.ico"
      );
      const $deleteBtn = $("<button/>")
        .addClass("li-btn delete-btn")
        .data({
          providerName: provider.name,
          providerVisibility: provider.visibility,
        })
        .html("<i class='fas fa-trash-alt'></i> Delete");
      $providerLi
        .append($editIcon)
        .append(
          $inputs
            .append($("<label>URL: </label>"))
            .append($url)
            .append($("<br><label>QUERY PATH: </label>"))
            .append($queryKey)
            .append($("<br><label>FAVICON URL: </label>"))
            .append($faviconUrl)
            .append($deleteBtn)
        );
      $deleteBtn.click(function (e) {});
    }
  }

  function createNewProviderSection() {
    /// Define elements
    const $restoreLink = $("<span/>")
      .attr("id", "restoreLink")
      .addClass("spanbtn")
      .append($("<i/>").addClass("fas " + restoreIconClass))
      .append("Reset search providers to default values");
    const $addLink = $("<span/>")
      .attr("id", "addLink")
      .addClass("spanbtn")
      .append($("<i/>").addClass("fas " + addIconClass))
      .append("Add a new search provider");
    const $form = $("<div />").addClass("new-provider-fields").hide();
    const $helpIcon = $("<i/>").addClass(helpIconClassList);
    const $tt = $("<div/>").addClass("tooltip");
    const $text = $("<span/>").addClass("text");
    const $name = produceInputEl("name").attr({ placeholder: "e.g. BBC" });
    const $url = produceInputEl("url").attr({
      placeholder: "e.g. https://www.bbc.co.uk/",
    });
    const $queryKey = produceInputEl("queryKey").attr({
      placeholder: "e.g. search?q=",
    });
    const $faviconUrl = produceInputEl("faviconUrl").attr({
      placeholder: 'defaults to "url/favicon.ico"',
    });
    /// Append elements
    $restoreLink.appendTo($settingsPage);
    $addLink.appendTo($settingsPage);
    var toAppend = [
      {
        label: "NAME: ",
        obj: $name,
        helptext: "This name will appear on the 'Icon Order' tab",
      },
      {
        label: "WEBSITE URL: ",
        obj: $url,
        helptext: "Everything between and including 'http' and '/'",
      },
      {
        label: "QUERY PATH: ",
        obj: $queryKey,
        helptext: "The search term wil be appended to this string",
      },
      {
        label: "FAVICON URL: ",
        obj: $faviconUrl,
        helptext: "If left blank, the default favicon path will be used",
      },
    ];
    toAppend.forEach((appendage) => {
      $form.append(
        $("<div/>")
          .append($(`<label>${appendage.label}</label>`))
          .append($helpIcon.clone())
          .append($tt.clone().append($text.clone().text(appendage.helptext)))
          .append(appendage.obj)
      );
    });
    $form
      .append($("<button/>").text("Add").attr({ id: "add-btn" }))
      .append($("<button/>").text("Cancel").attr({ id: "cancel-btn" }))
      .appendTo($addLink);
    /// Add listeners
    function formBtnClick(e) {
      e.stopPropagation();
      $form.hide().find("input").val("");
      $("#opts-table").slideDown().find("*").slideDown();
      $restoreLink.slideDown();
    }
    $addLink.click((e) => {
      $form.slideDown();
      $restoreLink.slideUp();
      $("#opts-table").slideUp().find("*").hide();
      $addLink.toggleClass("defaultCursor");
    });
    $form.click((e) => e.stopPropagation());
    $("#cancel-btn").click(formBtnClick);
    $("<div/>").css({ height: "30px" }).appendTo($settingsPage);
    $(".info-icon").hover(function (e) {
      $(this).parent().find(".text").fadeToggle(180);
    });
  }

  function createOptionsTable(optionsObj) {
    var $optsTable = $("<table/>");
    $optsTable.attr({ id: "opts-table" }).appendTo($settingsPage);
    var sortlist = [0, 0, 0, 0];
    $.each(optionsObj, function (i, option) {
      var $row = $("<tr/>").data({ order: option.order });
      var $labelTD = $(`<td>${option.label}</td>`);
      var $input = $(`<${option.type}>`).attr(option.attr).val(option.value);
      var $inputTD = $("<td/>").append($input);
      var $displayTD = $("<td/>")
        .addClass("display")
        .attr({ id: `${option.attr.id}-display` });
      sortlist[option.order - 1] = $row
        .append($labelTD)
        .append($inputTD)
        .append($displayTD);
      if (option.type == "input") {
        $displayTD.html(
          option.value
            ? (option.value % 1 == 0.5 ? option.value : option.value + ".0") +
                " s"
            : ""
        );
      }
      if (option.type == "select") {
        $.each(option.valList, function (i, val) {
          $("<option/>").text(val).appendTo($inputTD.find(option.type));
        });
        $input.val(option.value);
      }
    });
    $.each(sortlist, function (i, $el) {
      $optsTable.append($el);
    });
  }

  function addListeners(target, pairs) {
    Object.entries(pairs).forEach((entry) => {
      const [event, listener] = entry;
      //target[event](listener);
      $(document).on(event, target, listener);
    });
  }

  function askMe(string, callback = false) {
    var popup = document.createElement("div");
    $(popup)
      .css({
        height: "100%",
        width: "100%",
        "background-color": "rgba(255,255,255,0.9)",
        "z-index": "99",
        position: "fixed",
        top: "0",
        left: "0",
      })
      .append(
        $("<div/>")
          .addClass("alertPopup")
          .attr("id", "popup")
          .append($("<p/>").text(string))
          .append(
            $("<button/>")
              .text("OK")
              .css({
                position: "relative",
                margin: "10px",
                "background-color": "lightgrey",
              })
              .click(function () {
                if (callback) {
                  callback();
                }
                popup.parentElement.removeChild(popup);
              })
          )
      )
      .appendTo($("body"));
    if (callback) {
      $("#popup").append(
        $("<button/>")
          .text("Back")
          .css({
            position: "relative",
            margin: "10px",
            "background-color": "lightgrey",
          })
          .click(function () {
            popup.parentElement.removeChild(popup);
          })
      );
    }
  }

  function errorCheckObj(newObj, providersObj) {
    if (newObj.name == "") {
      return "Name cannot be left blank.";
    }
    if (Object.keys(providersObj).includes(newObj.name)) {
      return "Name already exists. Please choose another name.";
    }
    if (newObj.url == "") {
      return "URL cannot be left blank.";
    }
    if (!newObj.url.substring(0, 5).includes("http")) {
      return "URL must begin with 'http(s)://'.";
    }
    if (!newObj.url.slice(-1).includes("/")) {
      return "URL must end with '/'.";
    }
    if (newObj.queryKey == "") {
      return "Query path cannot be left blank.";
    }
    if (newObj.queryKey.substring(0, 1).includes("/")) {
      return "Query string must not begin with '/'.";
    }
    if (
      newObj.faviconUrl != "" &&
      !newObj.faviconUrl.substring(0, 5).includes("http")
    ) {
      return "Invalid favicon URL. Must start 'http(s)://'.";
    }
    return true;
  }

  chrome.storage.sync.get(["providers", "options"], (r) => {
    var optionsObj = r.options;
    var providersObj = r.providers;
    const setLists = function () {
      var providersList = Object.values(providersObj).sort(compare);
      $(".provider-li").remove();
      $.each(providersList, createProviderLi);
    };
    const resetLists = function () {
      chrome.storage.sync.get(["providers"], function (r) {
        providersObj = r.providers;
        setLists();
      });
    };
    /// Create Lists Page
    setLists();
    appendListsToPage();
    new Sortable(listElements.visible, {
      ...sortableOpts,
      ...{
        group: visibleGrpOpts,
      },
      ...sortableFuncs(providersObj),
    });
    new Sortable(listElements.hidden, {
      ...sortableOpts,
      ...sortableFuncs(providersObj),
    });
    new Sortable(listElements.disabled, {
      ...sortableOpts,
      ...sortableFuncs(providersObj),
    });
    $(".input-fields *").attr({ tabindex: "-1" });

    /// Create Options Page
    createOptionsTable(optionsObj);
    createNewProviderSection();

    /// Add Listeners

    addListeners(".li-input", {
      change: function (e) {
        var $providerEl = $(this).closest(".provider-li");
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
      },
    });
    addListeners(".tab", {
      mousedown: function (e) {
        $(this).animate({ opacity: "0.6" }, 100, "swing");
        if (!$(this).hasClass("active")) {
          $(".tab").toggleClass("active");
          $(".page").toggle();
        }
      },
      mouseup: function (e) {
        $(this).animate({ opacity: "1" }, 100, "swing");
      },
    });
    addListeners(".edit-icon", {
      mousedown: function (e) {
        let $closestLi = $(this).closest("li");
        $("li").not($closestLi).removeClass("expanded-li");
        $closestLi.toggleClass("expanded-li");
      },
    });
    addListeners(".tooltip", {
      hover: function (e) {
        e.stopPropagation();
      },
    });
    addListeners(".delete-btn", {
      click: function (e) {
        var name = $(e.target).data("providerName");
        var visi = $(e.target).closest("ul").attr("id");
        askMe(
          "Are you sure you want to delete this search provider?",
          function () {
            if (
              visi == "visible" &&
              $(listElements.visible).find("li").length <= 1
            ) {
              askMe("Cannot delete the only visible search provider.");
            } else {
              delete providersObj[name];
              chrome.storage.sync.set({ providers: providersObj }, resetLists);
            }
          }
        );
      },
    });
    addListeners("input[type='range']", {
      input: function () {
        const value = $(this).val();
        const $displayTD = $(this).closest("tr").find(".display");
        $displayTD.html((value % 1 == 0.5 ? value : value + ".0") + " s");
      },
      change: function () {
        optionsObj[this.id].value = this.value;
        chrome.storage.sync.set({ options: optionsObj });
      },
    });
    addListeners("select", {
      change: function () {
        optionsObj[this.id].value = this.value;
        chrome.storage.sync.set({ options: optionsObj });
      },
    });
    $("#restoreLink").click(function () {
      askMe(
        "Are you sure you want to reset search providers to the default options?",
        function () {
          chrome.storage.sync.set(
            { providers: defaults.providers },
            resetLists
          );
          $("#lists").trigger("mousedown");
        }
      );
    });
    $("#add-btn").click(function (e) {
      const name = document.getElementById("new-name").value;
      const newProvObj = {
        name: document.getElementById("new-name").value,
        url: document.getElementById("new-url").value,
        queryKey: document.getElementById("new-queryKey").value,
        faviconUrl: document.getElementById("new-faviconUrl").value,
        visibility: "hidden",
        position: 999,
      };
      const errorCheckResult = errorCheckObj(newProvObj, providersObj);
      if (errorCheckResult === true) {
        providersObj = { ...providersObj, ...{ [name]: newProvObj } };
        console.log(providersObj);
        chrome.storage.sync.set({ providers: providersObj }, resetLists);
        $(".new-provider-fields").hide().find("input").val("");
        $("#opts-table").slideDown().find("*").slideDown();
        $("#restoreLink").slideDown();
      } else {
        askMe(errorCheckResult);
      }
    });
  });
});
