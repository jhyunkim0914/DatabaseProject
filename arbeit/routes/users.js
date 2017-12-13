var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection(require('../config/dbconfig.js'));


/* GET users listing. */
router.get('/', function(req, res, next) {
  var sql = 'SELECT * FROM user';
  console.log(sql);

  var query = connection.query(sql, function(err,rows){
    if (err) {
      console.error(err);
    }
    console.log(rows);
    res.json(rows);
  });
});

/* GET users by userid. */
router.get('/idx=:userid', function(req, res, next) {
  var sql = 'SELECT * FROM user WHERE userid ='+mysql.escape(req.params.userid);
  console.log(sql);

  var query = connection.query(sql, function(err,row){
    if (err) {
      console.error(err);
    }
    console.log(row);
    res.json(row);
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
              'id':req.body.id,
              'password':req.body.password,
              'name':req.body.name,
              'address':req.body.address,
              'email':req.body.email,
              'phone':req.body.phone,
              'companyname':req.body.companyname,
              'companyid':req.body.companyid,
              'role':req.body.role
             };
    var query = connection.query('insert into user set ?',user,function(err,result){
    if (err) {
    console.error(err);
    throw err;
    }
    console.log(query);
    res.send(200,'success');
    });

});

/* POST users and get login check */
router.post('/login', function(req, res, next) {
  var sql = 'SELECT * FROM user WHERE id = '+mysql.escape(req.body.id)+' AND password = '+mysql.escape(req.body.password)+'';

  console.log(sql);
  var query = connection.query(sql, function(err,rows){
    if (err) {
      console.error(err);
    }
    if (rows.length == 0) {
      res.json({result: "login fail"});
    }
    else {
      req.session.user = rows[0];
      //console.log(req.session.user.role);
      if(req.session.user.role = "worker")
        res.render('workerindex', { title: '아르바이트',  user: req.session.user});
      if(req.session.user.role = "owner")
        res.render('ownerindex', { title: '아르바이트',  user: req.session.user});
    }
  });
});



module.exports = router;
