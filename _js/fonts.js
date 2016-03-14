$(function() {
  var fonts = 'https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto+Slab:400,300,700';
  if (document.createStyleSheet) document.createStyleSheet(fonts);
  else $("head").append($("<link rel='stylesheet' href='"+ fonts +"' type='text/css' media='screen' />"));
});
