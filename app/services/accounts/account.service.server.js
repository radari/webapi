
var moment = require('moment');
var mongoose         = require("mongoose");
//var methodOverride = require('express-method-override');

module.exports = function(app) {
  var AccountModel = require("../../models/transactions/account.model.server.js")();
    console.log(AccountModel);
    app.post  ('/api/accounts', create);
    app.get('/api/accounts', findAll);

    // exports.create = function(req, res){
    //   Account.create(req.body, function(){
    //     res.redirect('/accounts');
    //   });
    // };
    // //var index="accountlist.view";
    // exports.findAll = function(req, res){
    //   Account.findAll(function(err, accounts){
    //     res.render('accounts/accountlist.view',
    //     {accounts:accounts,
    //       moment:moment, helper:styleHelper});
    //   });
    // };
function create(req, res) {
    var newAccount = req.body;
console.log("serverside account creation call");
     AccountModel.create(newAccount)
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

// function isAdmin(user) {
//     if(user.roles.indexOf("admin") > 0) {
//         return true
//     }
//     return false;
// }
//
// function authorized (req, res, next) {
//     if (!req.isAuthenticated()) {
//         res.send(401);
//     } else {
//         next();
//     }
// };
};
