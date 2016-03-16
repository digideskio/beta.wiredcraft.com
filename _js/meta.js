$(function() {
  if (!$('#content .post').length) return;

  var metaHeight = 0,
      metaOffset = 0,
      windowHeight = 0;

  function metaInit() {
    metaHeight = $('#content .post .meta .container').outerHeight();
    $('#content .post .meta').height(metaHeight);
    metaOffset = $('#content .post .meta').offset();
    windowHeight = $(window).height();
    metaStick();
  }

  $(window).load(function () { metaInit(); });

  // If we have videos, we want to initialize after embedding them (see video.js)
  $('#content .post .body').on('modified', function () {
    $(window).load(function () {
      metaInit();
    });
  });

  // Resizing the window change the offset
  $(window).resize(function() {
    metaInit();
  });

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
