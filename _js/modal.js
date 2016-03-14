$(function() {
  $('button.modal, a.modal').click(function () {
    showModal($(this).attr('rel'));
  });

  $('#modal .close').click(hideModal);

  $(document).keyup(function(e) {
    if (e.keyCode == 27) { hideModal(); }
  });

  function showModal(modal) {
    console.log(modal);
    $('#modal .header h2.'+ modal +', #modal .body.'+ modal).show();
    $('body').addClass('modal');
  }

  function hideModal() {
    $('#modal .header h2, #modal .body').hide();
    $('body').removeClass('modal');
  }
});
