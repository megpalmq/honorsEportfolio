import { changePage } from "../model/model.js";

function route() {
  let hashTag = window.location.hash;
  let pageID = hashTag.replace("#", "");
  console.log("route", pageID);
  changePage(pageID);
}

function initSite() {
  $(window).on("hashchange", route);
  // Load home page on initial load if no hash
  if (!window.location.hash) {
    changePage("home");
  } else {
    route();
  }
  // Add is-loaded class to trigger animations
  $(document.body).addClass("is-loaded");
}

// Global scroll listener for about page fade effect
$(document).ready(function () {
  initSite();
});
