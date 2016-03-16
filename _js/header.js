$(function() {
  var height = 0;

  function headerInit() {
    height = $('#header').outerHeight();
    $('body').css({paddingTop: height}).addClass('fixed');
  }

  function headerStick() {
    if ($(window).scrollTop() > 0) {
      $('body').addClass('scrolled');
    }
    else {
      $('body').removeClass('scrolled');
    }
  }
  
  headerInit();
  headerStick();

  $(window).scroll(function () {
    headerStick();
  });


  $(window).resize(function() {
    headerInit();
  });
});
