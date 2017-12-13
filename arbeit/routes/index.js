var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { user: req.session.user, title: '아르바이트 도우미' });
});

/* Login page. */
router.get('/loginview', function(req, res, next) {
  res.render('loginview', { title: '아르바이트 도우미' });
});

router.get('/logout', function(req, res, next) {
  req.session.destroy(function(err){
    if(err) console.log(err);
    else {
      res.render('index', { title: '아르바이트 도우미'});
    }
  });
});

/* Login page. */
router.get('/workerindex', function(req, res, next) {
  res.render('workerindex', { title: '아르바이트 도우미' });
});

router.get('/worklist', function(req, res, next) {
  res.render('worklist', { title: '아르바이트 도우미' });
});

module.exports = router;
