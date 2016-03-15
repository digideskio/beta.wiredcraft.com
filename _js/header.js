$(function() {
  var height = $('#header').outerHeight();
  $('body').css({paddingTop: height}).addClass('fixed');
  if ($(this).scrollTop() > 0) $('body').addClass('scrolled');
  $(window).scroll(function () {
    if ($(this).scrollTop() > 0) {
      $('body').addClass('scrolled');
    }
    else {
      $('body').removeClass('scrolled');
    }
  });
});
