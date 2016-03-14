$(function() {
  // Replace youtube links with an embed
  var width  = 720;
  var height = 490;
  var embed = '<div class="video"><iframe'+
              ' width="'+ width +'" height="'+ height +'"'+
              ' src="https://www.youtube.com/embed/[vid]"'+
              ' frameborder="0" allowfullscreen></iframe></div>';

  $('.post a[href*="youtube.com/watch"]').each(function() {
      var that = $(this);
      var video = that.attr('href').match(/(?:v=)([\w\-]+)/g);
      if (video.length) {
          $.each(video, function(i){
              that.replaceWith(embed.replace(/\[vid\]/g, this.replace('v=','')) );
          });
      }
  });
});
