var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection(require('../config/dbconfig.js'));


/* GET reviews listing. */
router.get('/', function(req, res, next) {
  var sql = 'SELECT * FROM review';
  console.log(sql);

  var query = connection.query(sql, function(err,rows){
    if (err) {
      console.error(err);
    }
    console.log(rows);
    res.json(rows);
  });
});

/* GET review by id. */
router.get('/:id', function(req, res, next) {
  var sql = 'SELECT * FROM review WHERE id ='+mysql.escape(req.params.id);
  console.log(sql);

  var query = connection.query(sql, function(err,rows){
    if (err) {
      console.error(err);
    }
    console.log(rows);
    res.json(rows);
  });
});

/* POST review. */
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
    var query = connection.query('insert into review set ?',user,function(err,result){
    if (err) {
    console.error(err);
    throw err;
    }
    console.log(query);
    res.send(200,'success');
    });

});


module.exports = router;
