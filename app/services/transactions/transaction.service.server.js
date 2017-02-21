//var passport         = require('passport');
//var LocalStrategy    = require('passport-local').Strategy;
var mongoose         = require("mongoose");

module.exports = function(app) {

    var transactionModel = require("../../models/transactions/transaction.model.server.js")();

  //  var auth = authorized;
  //  app.post  ('/api/login', passport.authenticate('local'), login);
    app.post  ('/api/logout',         logout);
  //  app.get   ('/api/loggedin',       loggedin);
    app.post('/api/withdraw',  withdrawl);
    app.post('/api/deposit',  deposit);
    app.get('/api/transactions', findAllTransactions)
    app.get('/api/transactions/:accountNumber', findAllTransactionsByAccNo)


    function logout(req, res) {
        req.logOut();
        res.sendStatus(200)
    }

    function withdrawl(req, res) {
        var withdraw = req.body;
        console.log(withdraw);
      transactionModel
      .withdrawl(withdraw)
      .then(
        function(err){
            res.status(400).send(err);
        }
      )
  }

    function deposit(req, res) {
        var credit = req.body;
  //       currentBalance=user.balance;
  //       if(typeof(credit.balance)==="number"){
	// 	currentBalance +=credit.balance ;
	// }
	// else{
	// 	alert("error");
	// 	console.log("error");
	// }
      transactionModel
      .deposit(credit)
      .then(
        function(err){
            res.status(400).send(err);
        }
      )
}

function findAllTransactions(req, res) {
    transactionModel
            .findAllTransactions()
            .then(
                function (transactions) {
                    res.json(transactions);
                },
                function () {
                    res.status(400).send(err);
                }
            );
  }

  function findAllTransactionsByAccNo(req, res) {
      transactionModel
              .findAllTransactionsByAccNo(toAccount)
              .then(
                  function (transactions) {
                      res.json(transactions);
                  },
                  function () {
                      res.status(400).send(err);
                  }
              );
    }
}
