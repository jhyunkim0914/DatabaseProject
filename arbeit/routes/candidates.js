var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var async = require('async');
var connection = mysql.createConnection(require('../config/dbconfig.js'));
var connection2 = mysql.createConnection(require('../config/dbconfig.js'));

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

router.get('/ownerid=:ownerid', function(req, res, next) {
  var sql = "SELECT candi.contractid, candi.workerid, candi.candidatestate, worker.name, worker.phone, worker.email"+
            "  FROM user worker, candidate candi, contract cont"+
            " WHERE worker.userid = candi.workerid "+
            " AND candi.contractid = cont.contractid "+
            " AND cont.ownerid= " + mysql.escape(req.params.ownerid);
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

router.put('/', function(req, res, next) {
    var user = {
                'contractid': req.body.contractid,
                'workerid': req.body.workerid
               };
    var sql = 'UPDATE candidate SET candidatestate = "accepted" WHERE contractid = '+mysql.escape(req.body.contractid)+' AND workerid = '+mysql.escape(req.body.workerid)
    var sql2 = 'UPDATE contract SET workerid = '+ req.body.workerid +' WHERE contractid = '+mysql.escape(req.body.contractid)

    console.log(sql);

    var query = connection.query(sql2, function(err,result){
    if (err) {
    console.error(err);
    throw err;
    }
    console.log(query);
    res.send(200,'success');
  });

    // var tasks = [
    //     function (callback) {
    //       var query = connection.query(sql,function(err,result){
    //       if (err) {
    //         console.error(err);
    //         throw err;
    //       }
    //         console.log(query);
    //         connection.destroy();
    //       });
    //     },
    //     function (callback) {
    //       var query2 = connection2.query(sql2,function(err,result){
    //       if (err) {
    //         console.error(err);
    //         throw err;
    //       }
    //         console.log(query);
    //         res.send(200,'success');
    //       });
    //     }
    // ];

    // async.waterfall(tasks, function (err, results) {
    //   console.log(results);
    // });

});

module.exports = router;
