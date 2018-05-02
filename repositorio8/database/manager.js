/* maneja la comunicacion con la base de datos */

var config      = require('./../config.json');
var mongodb     = require('mongodb');

var MongoClient = mongodb.MongoClient;

/**
 * Obtiene los mensajes por paginas
 * 
 * @param {Number} limit
 * @param {Number} skip
 * @param callback
 */
var getMessages = function getMessages(limit, skip, callback)
{
	MongoClient.connect(config.db, function(err, db) {
        if (err) throw err;
        
        var collection = db.collection('messages');
        var cursor = collection.find({}).sort({ timestamp: -1 }).limit(limit).skip(skip);
        
        cursor.toArray(function(err, messages){
            if (err) throw err;
            callback(messages);
            db.close();
        });
    });
};

/**
 * Almacena el mensaje en base de datos
 * 
 * @param msg
 * @param callback
 */
var addMessage = function addMessage(msg, callback)
{
    MongoClient.connect(config.db, function(err, db) {
        if (err) throw err;
        
        var collection = db.collection('messages');

        collection.insert(
            msg
            , function(err, col){
                if (err) throw err;
                if (callback) callback();
                db.close();
            });
    });
};


var setup = function setup(callback) {
    // crea una capped collection para no incurrir en costes para la demo
    MongoClient.connect(config.db, function(err, db) {
        db.createCollection('messages', {'capped':true, 'size':1024}, function(err, collection) {
          db.close();
      });
    });
}



//exports
var exports = module.exports = {};
    exports.getMessages = getMessages;
    exports.addMessage  = addMessage;
    exports.setup       = setup;