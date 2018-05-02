//comunicacion mediante socket.io

var socket;
var typing = false;
var lastTypingTime;
var TYPING_TIMER_LENGTH = 600; // ms

if (typeof io !== 'undefined') {
	socket = io();
	socket.on('message', function(data) {
		if (!data.username) data.username = "anónimo";
	    addMessage(data);
	});

	socket.on('typing', function(data) {
		if (!($("#"+data.id).length)) {
			$("#typing").append("<li class='list-group-item' id='"+data.id+"'>"+(data.username ? data.username : "alguien") + " está escribiendo</li>");
		}
	});

	socket.on('stop-typing', function(data) {
		$("#"+data.id).remove();
	});

	socket.on('connect', function() {
		socket.emit('user-enter');
	});

	socket.on('user-enter', function(data) {
		console.log(data);
		$('#counter').text("participantes " + data.numUsers);
	});

	socket.on('user-left', function(data) {
		$('#counter').text("participantes: " + data.numUsers);
		$("#"+data.id).remove();
	});
};

function sendMessage(msg)
{
	socket.emit('message', msg);
}

function sendTyping(typing)
{
	if (typing)
		socket.emit('typing');
	else
		socket.emit('stop-typing');
}


//scripts de representacion 

function addMessage(msg) {

	var html = "<tr>";
	 	html += "<td>" + (msg.username ? msg.username : "yo") + "</td>"
	 	html += "<td>" + msg.message + "</td>"
	 	html += "<td class='timestamp' data='" + msg.timestamp + "'>" + msg.timestamp + "</td>"
	 	html += "</tr>";

	$("tbody").prepend(html);
	time();
};

function time() {
	$(".timestamp").each(function(){
		$(this).text($.timeago($(this).attr('data')));
	});
}


//eventos

function submitMessage() {
	var username = $("#username").val();
	var message = $("#message").val();

	if (message){
		var msg = {
			username : username,
			message : message,
			timestamp : new Date().toISOString()
		}
		//ocultamos el username si ya se ha elegido uno
		if (username) {
			$("label[for='username']").hide();
			$("#username").hide();
		}

		//limpiamos el form
		$("#message").val('');
		$("#mandatory").removeClass("has-error");

		addMessage({ message: msg.message, timestamp: msg.timestamp });
		sendMessage(msg);
	} else
	{
		$("#mandatory").addClass("has-error");
	}
};

function updateTyping () {
  if (!typing) {
    typing = true;
    sendTyping(true);
  }
  lastTypingTime = (new Date()).getTime();

  setTimeout(function () {
    var typingTimer = (new Date()).getTime();
    var timeDiff = typingTimer - lastTypingTime;
    if (timeDiff >= TYPING_TIMER_LENGTH && typing) {
      sendTyping(false);
      typing = false;
    }
  }, TYPING_TIMER_LENGTH);

}


$( document ).ready(function() {
    $("#addMessage").click(function(){
    	submitMessage();
    	return false;
    });

    $("#message").on('input', function() {
    	updateTyping();
    });

    time();
    window.setInterval(time, 30000);
});
