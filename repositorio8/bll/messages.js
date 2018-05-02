/* core de la funcionalidad de la aplicación */
var db = require('./../database/manager');



// actions
// ==============================================

// obtiene todos los mensajes desde el api
var getAllMessages = function getAllMessages(skip, limit, callback) {  
    
  db.getMessages(limit, skip, function(messages){
    callback(messages);
  });
  
};


// publica un nuevo mensaje
var postNewMessage = function postNewMessage(msg, callback) {
  
  msg.timestamp = new Date().toISOString();
  
  if (callback)
  	db.addMessage(msg, callback);
  else 
  	db.addMessage(msg);
  
};

var setupEnvironment = function setupEnvironment(callback) {
	db.setup(callback);
}



//exports
var exports = module.exports = {};
    exports.getAllMessages = getAllMessages;
    exports.postNewMessage = postNewMessage;
    exports.setupEnvironment = setupEnvironment;