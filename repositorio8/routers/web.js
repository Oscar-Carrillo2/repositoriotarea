var express   = require('express');
var actions   = require('./../controllers/web-actions');
var router    = express.Router();


//endpoints del api
router.get  ('/messages',  actions.getChat);
router.get  ('/messages/historial',  actions.getAllMessages);

//exports
module.exports = router;