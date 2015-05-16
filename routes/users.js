var express = require('express');
var router = express.Router();
var userStore = require('../service/userStore');
/* GET users listing. */
router.get('/', function(req, res, next) {


  res.render('admin', {users: userStore.getAll()});
});

module.exports = router;
