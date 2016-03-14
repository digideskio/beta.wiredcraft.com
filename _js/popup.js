$(function() {
  var POPUP_HEIGHT = 300;
  var POPUP_WIDTH = 600;
  $('.popup').click(function(event) {
      event.preventDefault();
      var left = (screen.width/2) - (POPUP_WIDTH/2);
      var top = (screen.height/2) - (POPUP_HEIGHT/2);
      window.open($(this).attr('href'), 'popupWindow', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+ POPUP_WIDTH +', height='+ POPUP_HEIGHT +', top='+ top +', left='+ left);
  });
});
