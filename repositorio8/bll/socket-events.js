/* Maneja los eventos del canal websocket */

var bll			= require('./messages');

function onReceivedMessage(socket, message) {
	if (message.username) socket.username = message.username;
		socket.broadcast.emit('message', message);
		bll.postNewMessage(message);
};

function onUserConnected(socket, status) {
	++(status.numUsers);
    status.addedUser = true;

    socket.broadcast.emit('user-enter', {
      numUsers: status.numUsers
    });
};

function onUserTyping(socket) {
	socket.broadcast.emit('typing', {
	  id: socket.id,
      username: socket.username
    });
};

function onUserTypingStop(socket) {
	socket.broadcast.emit('stop-typing', {
	  id: socket.id,
      username: socket.username
    });
};

function onUserDisconnect(socket, status) {
	if (status.addedUser) {
      --(status.numUsers);

      socket.broadcast.emit('user-left', {
      	id: socket.id,
        numUsers: status.numUsers
      });
    }
};

/**
* listener que maneja todos los eventos del socket
*/
var listener = function listener(socket, status) {

	socket.on('message', function (message) {
		onReceivedMessage(socket, message);
	});

	socket.on('user-enter', function () {
		onUserConnected(socket, status);
	});

	socket.on('typing', function () {
		onUserTyping(socket);
	});

	socket.on('stop-typing', function () {
		onUserTypingStop(socket);
	});

	socket.on('disconnect', function () {
		onUserDisconnect(socket, status);
	});

};



//exports
module.exports = listener;