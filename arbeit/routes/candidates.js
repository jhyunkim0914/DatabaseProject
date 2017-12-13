var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection(require('../config/dbconfig.js'));


router.get('/', function(req, res, next) {
  var sql = 'SELECT * FROM candidate';
  console.log(sql);

  var query = connection.query(sql, function(err,rows){
    if (err) {
      console.error(err);
    }
    console.log(rows);
    res.json(rows);
  });
});

/* POST candidate information. */
router.post('/', function(req, res, next) {
  var user = {
              'contractid': req.body.contractid,
              'workerid': req.body.workerid,
              'candidatestate': "request",
             };
    var query = connection.query('insert into candidate set ?',user,function(err,result){
    if (err) {
    console.error(err);
    throw err;
    }
    console.log(query);
    res.send(200,'success');
    });

});

module.exports = router;
