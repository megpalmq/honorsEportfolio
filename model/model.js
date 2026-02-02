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
  }
}
