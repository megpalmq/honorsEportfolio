function changeRoute() {
  let hashTag = window.location.hash;
  let pageID = hashTag.replace("#", "");

  // DEFAULT TO HOME
  if (pageID === "") {
    pageID = "home";
  }

  const pagePath = `pages/${pageID}/${pageID}.html`;

  console.log("Loading:", pagePath);

  $.get(pagePath, function (data) {
    $("#app").fadeOut(150, function () {
      $(this).html(data).fadeIn(250);
      window.scrollTo(0, 0);
    });
  }).fail(function () {
    $("#app").html(`<h2>Page not found: ${pageID}</h2>`);
  });
}

function initURLListener() {
  $(window).on("hashchange", changeRoute);
  changeRoute(); // ← THIS is what auto-loads home
}

$(document).ready(function () {
  initURLListener();
});
