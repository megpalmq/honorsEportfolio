export function changePage(pageName) {
  console.log("pageName:", pageName);
  if (pageName == "") {
    $.get("pages/home.html", (data) => {
      $("#app").html(data);
      // Trigger reflow to restart animations
      $(document.body).removeClass("is-loaded");
      void document.body.offsetHeight; // Force reflow
      $(document.body).addClass("is-loaded");
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
