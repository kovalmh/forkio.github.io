$(document).ready(() => {
    const btnElem = $("#menuToggle"),
      targetElem = $(btnElem.attr("data-target"));
  
    btnElem.on("click", () => {
      targetElem.slideToggle(200);
    });
  
    $(window).on("resize", () => {
      if (window.innerWidth >= 768) {
        targetElem.attr("style", "");
      }
    });
  });
  