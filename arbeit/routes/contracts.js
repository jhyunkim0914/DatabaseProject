var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection(require('../config/dbconfig.js'));



/* GET contracts listing. */
router.get('/', function(req, res, next) {
  var sql = 'SELECT * FROM contract';
  console.log(sql);

  var query = connection.query(sql, function(err,rows){
    if (err) {
      console.error(err);
    }
    console.log(rows);
    res.json(rows);
  });
});

/* GET contract listing. */
router.get('/ongoinglist', function(req, res, next) {
  var sql = 'SELECT c.contractid, c.content, owner.name, owner.companyname, owner.companyid, owner.phone '+
            'FROM contract c JOIN user owner LEFT JOIN user worker ON (c.workerid=worker.userid) '+
            'WHERE c.ownerid = owner.userid AND contractstate = "ONGOING"';
  console.log(sql);

  var query = connection.query(sql, function(err,rows){
    if (err) {
      console.error(err);
    }
    console.log(rows);
    res.json(rows);
  });
});

/* GET users by contractid. */
router.get('/contractid=:contractid', function(req, res, next) {
  var sql = 'SELECT * FROM contract WHERE contractid ='+mysql.escape(req.params.contractid);
  console.log(sql);

  var query = connection.query(sql, function(err,row){
    if (err) {
      console.error(err);
    }
    console.log(row);
    res.json(row);
  });
});

/* GET users by contractid. */
router.get('/recruitformat=:contractid', function(req, res, next) {
  var sql = "select contractid,ownerid, owner.name as name, owner.phone as phone, owner.address as address"+
       ",content,workingtime,wagetiming,wage,bonus,otherpay,bonusrate,payday,howtopay,socialinsurance"+
       ",DATE_FORMAT(startdate, '%Y-%m-%d') as startdate,DATE_FORMAT(enddate, '%Y-%m-%d') as enddate,DATE_FORMAT(contractdate, '%Y-%m-%d') as contractdate "+
       "from contract c, user owner where c.ownerid=owner.userid and c.contractid = "+mysql.escape(req.params.contractid);
  console.log(sql);

  var query = connection.query(sql, function(err,row){
    if (err) {
      console.error(err);
    }
    console.log(row);
    res.json(row[0]);
  });
});

/* GET users by id. */
router.get('/userid=:id', function(req, res, next) {
  var sql = 'SELECT * FROM user WHERE id ='+mysql.escape(req.params.id);
  console.log(sql);

  var query = connection.query(sql, function(err,row){
    if (err) {
      console.error(err);
    }
    console.log(row);
    res.json(row);
  });
});

/* POST users and insert row. */
router.post('/', function(req, res, next) {
  var user = {
                'ownerid': req.body.ownerid,
                'startdate': req.body.startdate,
                'enddate': req.body.enddate,
                'content': req.body.content,
                'workingtime': req.body.workingtime,
                'wagetiming': req.body.wagetiming,
                'wage': req.body.wage,
                'bonus': req.body.bonus,
                'otherpay': req.body.otherpay,
                'bonusrate': req.body.bonusrate,
                'payday': req.body.payday,
                'howtopay': req.body.howtopay,
                'socialinsurance': req.body.socialinsurance,
                'contractdate': req.body.contractdate,
                'contractstate': 'ONGOING',
             };
    var query = connection.query('insert into contract set ?',user,function(err,result){
    if (err) {
    console.error(err);
    throw err;
    }
    console.log(query);
    res.send(200,'success');
    });
});

module.exports = router;
