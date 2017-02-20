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
  //  passport.use(new LocalStrategy(localStrategy));
    //passport.serializeUser(serializeUser);
    //passport.deserializeUser(deserializeUser);

    // function localStrategy(username, password, done) {
    //     transactionModel
    //         .findUserByCredentials({username: username, password: password})
    //         .then(
    //             function(user) {
    //                 if (!user) { return done(null, false); }
    //                 return done(null, user);
    //             },
    //             function(err) {
    //                 if (err) { return done(err); }
    //             }
    //         );
    // }
    //
    // function serializeUser(user, done) {
    //     done(null, user);
    // }
    //
    // function deserializeUser(user, done) {
    //     transactionModel
    //         .findUserById(user._id)
    //         .then(
    //             function(user){
    //                 done(null, user);
    //             },
    //             function(err){
    //                 done(err, null);
    //             }
    //         );
    // }
    //
    // function login(req, res) {
    //     var user = req.user;
    //     res.json(user);
    // }



    function logout(req, res) {
        req.logOut();
        res.sendStatus(200)
    }


  //   function withdrawl(req, res) {
  //       var withdraw = req.body;
  //     transactionModel
  //     .withdrawl(req.params.id, debit)
  //     .then(
  //       function(transaction)
  //       {
  //         return TransactionModel.withdrawl()
  //       } ,
  //     function(err){
  //         res.status(400).send(err);
  //     }
  //   )
  // .then(
  //     function(transaction){
  //         res.json(transaction);
  //     },
  //     function(err){
  //         res.status(400).send(err);
  //     }
  // );
  //
  //   }

    function withdrawl(req, res) {
        var withdraw = req.body;
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
    } else {
        res.status(403);
    }
}

//     function deposit(req, res) {
//         var credit = req.body;
//       transactionModel
//       .deposit(credit)
//       .then(
//         function(transaction)
//         {
//             return TransactionModel.deposit()
//         },
//       function(err){
//           res.status(400).send(err);
//       }
// )
//   .then(
//       function(transaction){
//           res.json(transaction);
//       },
//       function(err){
//           res.status(400).send(err);
//       }
//   ); }
}
