/* core de la funcionalidad de la aplicación */
var sdk = require('./../sdks/chat');


// actions
// ==============================================

// obtiene todos los mensajes desde la persistencia
var getAllMessages = function getAllMessages(req, res) {  
    
  var page = req.query.page ? Number(req.query.page) : 1

  sdk.getMessages(page, function(messages){
    res.render('messages', { messages: messages, page: page, active: "historial" } );
  });
  
};

// obtiene la pantalla de chat en directo
var getChat = function getChat(req, res) {  
    res.render('chat', { active: "chat", counter: req.app.ioStatus.numUsers });
};




//exports
var exports = module.exports = {};
    exports.getAllMessages = getAllMessages;
    exports.getChat		   = getChat;