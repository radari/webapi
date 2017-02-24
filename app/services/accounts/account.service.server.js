
var moment = require('moment');
var mongoose         = require("mongoose");


module.exports = function(app) {
  var AccountModel = require("../../models/transactions/account.model.server.js")();
    console.log(AccountModel);
    app.post  ('/api/accounts', create);
    app.get('/api/accounts', findAll);
  //  app.get('/api/accounts/'+_id +'/transfer', transfer);
    app.get('api/accounts/transfer', transferInit);
  app.put('api/accounts/transfer', transfer);

  app.get('/api/accounts/transactionInit', transactionInit);
    app.put('/api/accounts/transaction', transaction);

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

      function transfer(req, res) {
          var transfer = req.body;
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

 function tFrom(accounts, id){
    var index = accounts.map(function(o){return o._id.toString();}).indexOf(id);
    return accounts[index].name;
  };

  function tOptions  (accounts, id){
    var index = accounts.map(function(o){return o._id.toString();}).indexOf(id);
    accounts.splice(index, 1);
    var options = accounts.map(function(a){return '<option value="' + a._id.toString() + '">' + a.name + '</option>';});
    //console.log(options.join(''));
    return options.join('');
  };


};
