$(document).ready ->
	
	socket = io.connect 'http://localhost:3050'

	socket.on 'newDoc', (data) ->
		div = '<div id="1">'
		a = '<a href="/archive/1">1</a>'
		$('#docs').append('<p>'+div+''+a+'</div></p>')
		socket.emit 'ok?', { text: 'OK' }

	socket.on 'deleted', (data) ->
		$('div#'+data.id).remove()

	$('input[type=submit]').click (event) ->
		event.preventDefault()
		url = $('#url').val()
		socket.emit 'addDoc', { url: url }
		
	$('#delete').live 'click', (event) ->
		event.preventDefault()
		id = $(this).val()
		socket.emit 'delDoc', { id: id }
