(function($) {
  var node;
  var bookmarklet = document.getElementById('DELI_save_link_slidedown');
  if (bookmarklet) {
    $('#DELI_mist').show();
    $('#DELI_save_link_slidedown').slideDown('normal');
    return
  }
  if (!window.jQuery) {
    node = document.createElement('SCRIPT');
    node.type = 'text/javascript';
    node.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js';
    document.body.appendChild(node)
  }
  node = document.createElement('SCRIPT');
  node.type = 'text/javascript';
  node.src = window.location.protocol + '//yooarrell.com/bookmark.html?url=' + encodeURIComponent(window.location.href);
  document.body.appendChild(node)
})(window.jQuery);
