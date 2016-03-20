$(function() {
  var fonts = 'https://fonts.googleapis.com/css?family=Montserrat:300,300italic,400,400italic,700,700italic|Lato:300,300italic,400,400italic,700,700italic';
  if (document.createStyleSheet) document.createStyleSheet(fonts);
  else $("head").append($("<link rel='stylesheet' href='"+ fonts +"' type='text/css' media='screen' />"));
});
