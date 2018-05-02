/* SDK de acceso al api de nuestro chat */
var unirest			= require('unirest');
var config      	= require('./../config.json');
var itemsPerPage 	= 10;

/**
* Obtiene los mensajes desde el api
*/
var getMessages = function getMessages(page, callback){

	var pagination = getPaginationData(page);

	var url = config.apiurl + "/messages";

	var Request = unirest.get(url)
		 .header('Authorization', config.apikey)
		 .query('skip='+pagination.skip)
		 .query('limit='+pagination.limit)
		 .end(function (response) {
				callback(response.body);
		 });
}

/**
* Publica un nuevo mensaje usando el sdk
*/
var postMessage = function pustMessage(msg, callback) {

	var url = config.apiurl + "/messages";

	var Request = unirest.post(url)
		 .header('Authorization', config.apikey)
		 .send(msg)
		 .end(function (response) {
				callback(response.body);
		 });
}

/**
* obtiene el skip y limit apropiado para un numero de pagina
*/
function getPaginationData(page)
{
	var data = {
		skip: itemsPerPage * (page - 1),
		limit: itemsPerPage
	}

	return data;
}



//exports
var exports = module.exports = {};
    exports.getMessages = getMessages;
    exports.postMessage = postMessage;