$(function() {
  headerStick();

  $(window).scroll(function () {
    headerStick();
  });

  function headerStick() {
    if ($(window).scrollTop() > 0) {
      $('#header').addClass('scrolled');
    }
    else {
      $('#header').removeClass('scrolled');
    }
  }
});
