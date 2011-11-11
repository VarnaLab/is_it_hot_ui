
  $(document).ready(function() {
    var socket;
    socket = io.connect('http://localhost:3050');
    socket.on('newDoc', function(data) {
      var a, div;
      div = '<div id="1">';
      a = '<a href="/archive/1">1</a>';
      $('#docs').append('<p>' + div + '' + a + '</div></p>');
      return socket.emit('ok?', {
        text: 'OK'
      });
    });
    socket.on('deleted', function(data) {
      return $('div#' + data.id).remove();
    });
    $('input[type=submit]').click(function(event) {
      var url;
      event.preventDefault();
      url = $('#url').val();
      return socket.emit('addDoc', {
        url: url
      });
    });
    return $('#delete').live('click', function(event) {
      var id;
      event.preventDefault();
      id = $(this).val();
      return socket.emit('delDoc', {
        id: id
      });
    });
  });
