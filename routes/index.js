var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var imageClass= "";
  if( req.user===undefined){
    imageClass = "blur";
    res.render('index', { title: 'Express',user : undefined ,imageClass : imageClass});
  }else{
    res.render('index', { title: 'Express',user : req.user.user ,imageClass : imageClass});

  }

});

router.get('/shop', function(req, res, next) {
  var imageClass= "";
  if( req.user===undefined){
    imageClass = "blur";
    res.render('shop', { title: 'Express',user : undefined ,imageClass : imageClass});
  }else{
    res.render('shop', { title: 'Express',user : req.user.user ,token:req.user.accessToken,imageClass : imageClass});

  }

});

module.exports = router;
