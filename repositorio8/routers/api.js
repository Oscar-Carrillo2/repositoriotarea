var express   = require('express');
var actions   = require('./../controllers/api-actions');
var auth      = require('./../controllers/api-auth');
var router    = express.Router();


//middlewares
router.use(auth);

//endpoints del api
router.get  ('/messages',  actions.getAllMessages);
router.post ('/messages',  actions.postNewMessage);

//exports
module.exports = router;