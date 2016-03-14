$(function() {
  if (!$('#content .post').length) return;

  var metaHeight = 0,
      metaOffset = 0,
      windowHeight = 0;

  function metaInit() {
    $('#content .post .meta').height('');
    metaHeight = $('#content .post .meta').outerHeight();
    $('#content .post .meta').height(metaHeight);
    metaOffset = $('#content .post .meta').offset();
    windowHeight = $(window).height();
    metaStick();
  }

  metaInit();

  // Custom event thrown by vide.js
  $('#content .post .body').on('modified', metaInit);

  // Resizing the window change the offset
  $(window).resize(function() {
    metaInit();
  });

  $(window).scroll(function () { metaStick(); });

  function metaStick() {
    var windowScroll = $(window).scrollTop();

    if ((windowScroll + windowHeight) < metaOffset.top) {
      $('#content .post .meta .container').addClass('fixed');
    }
    else {
      $('#content .post .meta .container').removeClass('fixed');
    }
  }
});
