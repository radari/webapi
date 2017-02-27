//var passport         = require('passport');
//var LocalStrategy    = require('passport-local').Strategy;
var moment = require('moment');
//var mongoose         = require("mongoose");
var Mongo      = require("mongodb");
var async = require('async')
var userModel = require("../../models/user/user.model.server.js");

module.exports = function(app) {
  var AccountModel = require("../../models/transactions/account.model.server.js")();


  var auth = authorized;
    console.log(AccountModel);
    app.get('/api/addAccount',auth, account_create_get)
    app.post  ('/api/accounts', auth, create);
    app.get('/api/accounts', auth, findAll);
  //  app.get('/api/accounts/'+_id +'/transfer', transfer);
    app.get('api/accounts/transfer', auth, transferInit);
  app.put('api/accounts/transfer', auth, transfer);
//app.post  ('/api/login', passport.authenticate('local'), login);
  app.get('/api/accounts/transactionInit', auth, transactionInit);
    app.put('/api/accounts/transaction',auth, transaction);
app.get   ('/api/loggedin',       loggedin);

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }
    function isAdmin(user) {
        if(user.roles.indexOf("admin") > 0) {
            return true
        }
        return false;
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };


function create(req, res) {
    var newAccount = req.body;
console.log("serverside account creation call");
     AccountModel
     .createAccount(newAccount)
          .then(
              // fetch all the accounts
                function(){
                  console.log("fetech accounts");
                      return AccountModel.findAll();
                },
                function(err){
                      res.status(400).send(err);
                }
          )
          .then(
            function(accounts){
                res.json(accounts);
            },
            function(){
                res.status(400).send(err);
            }
        )
      }

      function transfer(req, res) {
          var transfer = req.body;
      console.log("serverside account creation call");
           AccountModel.createAccount(newAccount)
                .then(
                    // fetch all the accounts
                      function(){
                        console.log("fetech accounts");
                            return AccountModel.findAll();
                      },
                      function(err){
                            res.status(400).send(err);
                      }
                )
                .then(
                  function(transfers){
                      res.json(transfers);
                  },
                  function(){
                      res.status(400).send(err);
                  }
              )
            }

            function transfer(req, res){
              console.log(req.body);
              AccountModel.transfer(req.body).then(
                function(accounts){
                    res.json(accounts);
                },
                function(){
                    res.status(400).send(err);
                }
              );
              }

          function transferInit (req, res){
                AccountModel.findAll().then(
                  function(accounts){
                  res.json(accounts);
                  console.log("laoding to accounts " + res.json(accounts));
                },
                function(){
                    res.status(400).send(err);
                }
              );
              }

              //Transactions
              function transactionInit(req, res){
                AccountModel.findByIdLite(req.params.id, account).then(function(account)
              {
                  res.json(account);
              },
            function()  {
                  res.status(400).send(err);
                })
              }
              function transaction(req, res){
                req.body.id = req.params.id;
                AccountModel.transaction(req.body).then(function(){
                  res.json(req.body);
                },
                function(){
                  res.status(200).send(req.params.id);
                });
              }




function findAll(req, res) {
  console.log("service server log");
        AccountModel
            .findAll()
            .then(
                function (accounts) {
                  console.log("json data"+accounts);
                    res.json(accounts);
                },
                function () {
                    res.status(400).send(err);
                }
            );
  }

  function account_create_get(req, res, next) {

      //Get all users , which we can use for adding to our account.
      async.parallel({
          users: function(callback) {
              userModel.findAll(callback)
          }
      }, function(err, results) {
          if (err) { return next(err); }
          res.render('account.view', { title: 'Create Account',authors:results.users });
      });

  }


};
