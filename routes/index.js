var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var imageClass= "";
  if( req.user===undefined){
    imageClass = "blur";
  }
  res.render('index', { title: 'Express',user : req.user ,imageClass : imageClass});
});

module.exports = router;
