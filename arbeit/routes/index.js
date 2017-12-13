var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  if( typeof req.session.user == "undefined")
    req.session.user = {role: "None"};
  res.render('index', { user: req.session.user, title: '아르바이트 도우미' });
});

/* Login page. */
router.get('/loginview', function(req, res, next) {
  res.render('loginview', { title: '아르바이트 도우미' });
});

module.exports = router;
