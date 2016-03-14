$(function() {
  var metaHeight = $('#content .post .meta').outerHeight();
  $('#content .post .meta').height(metaHeight);
  var metaOffset = $('#content .post .meta').offset();
  var windowHeight = $(window).height();

  metaStick();

  $(window).scroll(function () {
    metaStick();
  });

  function metaStick() {
    var windowScroll = $(window).scrollTop();

    if ((windowScroll + windowHeight) < metaOffset.top + metaHeight) {
      $('#content .post .meta .container').addClass('fixed');
    }
    else {
      $('#content .post .meta .container').removeClass('fixed');
    }
  }
});
