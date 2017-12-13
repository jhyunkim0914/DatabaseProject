var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection(require('../config/dbconfig.js'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { user: req.session.user, title: '아르바이트 도우미' });
});

/* Employer Join page*/
router.get('/employerjoin', function(req, res, next){
    res.render('employerjoin', { title: 'employerjoin' });
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
  res.render('workerindex', { user: req.session.user, title: '아르바이트 도우미' });
});

router.get('/worklist', function(req, res, next) {
  res.render('worklist', { user: req.session.user, title: '아르바이트 도우미' });
});

router.get('/recruitinfo/contractid=:contractid', function(req, res, next) {
  res.render('recruit', { user: req.session.user, contractid: req.params.contractid, title: '아르바이트 도우미' });
});

router.get('/ownerindex', function(req, res, next) {
  res.render('ownerindex', { user: req.session.user, title: '아르바이트 도우미' });
});

router.get('/workinfo=:contractid', function(req, res, next) {
  var sql = "select c.contractid, c.ownerid, c.workerid, owner.name as ownername, worker.name as workername, owner.address as owneraddress, worker.address as workeraddress, owner.companyid as companyid" +
            ", owner.companyname as companyname, worker.phone as workerphone"+
            ",c.content,workingtime,wagetiming,wage,bonus,otherpay,bonusrate,payday,howtopay,socialinsurance"+
            ",DATE_FORMAT(startdate, '%Y-%m-%d') as startdate,DATE_FORMAT(enddate, '%Y-%m-%d') as enddate,DATE_FORMAT(contractdate, '%Y-%m-%d') as contractdate " +
            "from contract c, user owner, user worker where c.ownerid=owner.userid and c.workerid=worker.userid and c.contractid=" + mysql.escape(req.params.contractid);

  var query = connection.query(sql, function(err,rows){
    if (err) {
      console.error(err);
    }
    console.log(rows);
    res.render('workinfo', { information: rows[0], title: '아르바이트 도우미' });
  });

});

router.get('/reviewlist', function(req, res, next) {
  res.render('reviewlist', { user: req.session.user, title: '아르바이트 도우미' });
});

router.get('/makeContract', function(req, res, next) {
  res.render('makeContract', { user: req.session.user, title: '아르바이트 도우미' });
});

router.get('/specificreviews', function(req, res, next) {
  res.render('specificreviews', {title: '자세한리뷰'});
});

module.exports = router;
