//var passport         = require('passport');
//var LocalStrategy    = require('passport-local').Strategy;
var mongoose         = require("mongoose");

module.exports = function(app) {

    var transactionModel = require("../../models/transactions/transaction.model.server.js")();

    var auth = authorized;
  //  app.post  ('/api/login', passport.authenticate('local'), login);
    app.post  ('/api/logout',         logout);
    app.get   ('/api/loggedin',       loggedin);
    app.post('/api/transaction', auth, withdrawl);
    app.post('/api/transaction', auth, deposit);
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

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.sendStatus(200)
    }


    function withdrawl(req, res) {
        var withdraw = req.body;
      transactionModel
      .withdrawl(req.params.id, debit)
      .then(
        function(transaction)
        {
          return TransactionModel.withdrawl()
        } ,
      function(err){
          res.status(400).send(err);
      }
    )
  .then(
      function(transaction){
          res.json(transaction);
      },
      function(err){
          res.status(400).send(err);
      }
  );

    }

    function deposit(req, res) {
        var credit = req.body;
      transactionModel
      .deposit(req.params.id, credit)
      .then(
        function(transaction)
        {
            return TransactionModel.deposit()
        },
      function(err){
          res.status(400).send(err);
      }
)
  .then(
      function(transaction){
          res.json(transaction);
      },
      function(err){
          res.status(400).send(err);
      }
  ); }

    function isAdmin(user) {
        if(user.roles.indexOf("admin") > 0) {
            return true
        }
        return false;
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.sendStatus(401);
        } else {
            next();
        }
    };
}
