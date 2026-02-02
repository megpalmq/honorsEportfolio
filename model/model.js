export function changePage(pageName) {
  console.log("pageName:", pageName);
  if (pageName == "") {
    $.get("pages/home.html", (data) => {
      $("#app").html(data);
      // Trigger reflow to restart animations
      $(document.body).removeClass("is-loaded");
      void document.body.offsetHeight; // Force reflow
      $(document.body).addClass("is-loaded");
      setupPageListeners(pageName);
    }).fail((error) => {
      console.log("error", error);
      Swal.fire({
        title: "Error",
        text: `${error.statusText}`,
        icon: "error",
        confirmButtonText: "yes",
      });
    });
  } else {
    $.get(`pages/${pageName}.html`, (data) => {
      $("#app").html(data);
      // Trigger reflow to restart animations
      $(document.body).removeClass("is-loaded");
      void document.body.offsetHeight; // Force reflow
      $(document.body).addClass("is-loaded");
      setupPageListeners(pageName);
    }).fail((error) => {
      console.log("error", error);
      Swal.fire({
        title: "Error",
        text: `${error.statusText}`,
        icon: "error",
        confirmButtonText: "yes",
      });
    });
  }
}

function setupPageListeners(pageName) {
  if (pageName === "about") {
    $("#about")
      .off("scroll")
      .on("scroll", function () {
        const scrolled = $(this).scrollTop();
        const aboutH1 = $(".aboutME");
        const bandH1 = $(".band h1");

        if (aboutH1.length) {
          console.log("About scroll:", scrolled);
          const opacity = Math.max(0, 1 - scrolled / 100);
          aboutH1.css("opacity", opacity);
        }

        if (bandH1.length) {
          const bandOpacity = Math.min(1, scrolled / 200);
          bandH1.css("opacity", bandOpacity);
        }
      });
  } else if (pageName === "artifact1") {
    $("#artifact1")
      .off("scroll")
      .on("scroll", function () {
        const scrolled = $(this).scrollTop();
        const container = $(".container");
        const intro = $(".intro");
        const original = $(".original");
        const newState = $(".newState");

        // Fade in container as you scroll
        if (container.length) {
          const containerOpacity = Math.min(1, scrolled / 200);
          container.css("opacity", containerOpacity);
        }

        // Fade out and move intro as you scroll
        if (intro.length) {
          const introOpacity = Math.max(0, 1 - scrolled / 150);
          const introTranslate = scrolled * 0.3;
          intro.css({
            opacity: introOpacity,
            transform: `translateY(${introTranslate}px)`,
          });
        }

        // Animate original section
        if (original.length) {
          const originalOpacity = Math.min(
            1,
            Math.max(0, (scrolled - 100) / 150),
          );
          const originalTranslate = Math.max(0, 30 - (scrolled - 100) * 0.15);
          original.css({
            opacity: originalOpacity,
            transform: `translateY(${originalTranslate}px)`,
          });
        }

        // Animate newState section
        if (newState.length) {
          const newStateOpacity = Math.min(
            1,
            Math.max(0, (scrolled - 300) / 150),
          );
          const newStateTranslate = Math.max(0, 30 - (scrolled - 300) * 0.15);
          newState.css({
            opacity: newStateOpacity,
            transform: `translateY(${newStateTranslate}px)`,
          });
        }
      });
  }
}
