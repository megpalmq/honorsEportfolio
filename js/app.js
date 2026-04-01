import { changePage } from "../model/model.js";

function closeMobileNav() {
  $("header").removeClass("mobile-nav-open");
  $(document.body).removeClass("mobile-nav-lock");
  $(".mobile-nav-toggle").attr("aria-expanded", "false");
}

function setupMobileNav() {
  $(document).on("click", ".mobile-nav-toggle", function () {
    const $header = $("header");
    const isOpen = $header
      .toggleClass("mobile-nav-open")
      .hasClass("mobile-nav-open");
    $(document.body).toggleClass("mobile-nav-lock", isOpen);
    $(this).attr("aria-expanded", String(isOpen));
  });

  // Close menu after selecting any destination.
  $(document).on("click", "header nav a", function () {
    closeMobileNav();
  });

  // Reset menu state when moving back to desktop.
  $(window).on("resize", function () {
    if (window.innerWidth > 760) {
      closeMobileNav();
    }
  });

  // Close when user taps outside header.
  $(document).on("click", function (event) {
    const isOpen = $("header").hasClass("mobile-nav-open");
    if (!isOpen) {
      return;
    }

    if (!$(event.target).closest("header").length) {
      closeMobileNav();
    }
  });

  // Close with Escape for accessibility.
  $(document).on("keydown", function (event) {
    if (event.key === "Escape") {
      closeMobileNav();
    }
  });
}

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
  setupMobileNav();
}

// Global scroll listener for about page fade effect
$(document).ready(function () {
  initSite();
});
