'use strict';

var _ = require('lodash');
var async = require('async');
var Transfer = require('./transfers.model.server.js');
var user = require("../../models/user/user.model.server.js");

var Mongo = require('mongodb');
var mongoose = require('mongoose'), Schema = mongoose.Schema,construct = require('mongoose-construct');
module.exports = function() {
var AccountSchema = new Schema(
    {
      uid:{
        type: Schema.ObjectId,
        ref: 'user' , required: true
    },
        name: String,
        dateCreated: {type: Date, default: Date.now },
        type: String,
        pin: Number,
        balance: Number,

        numTract: Number,
        transactions: [],
        xferIds:[]

    }, {collection: "Account"});

    var Account = mongoose.model('Account', AccountSchema)
var a = new Account();
console.log(a);
  // var Account = mongoose.model('Account', AccountSchema);
// Object.defineProperty(Account, 'collection', {
//   get: function(){return global.mongodb.collection('accounts');}
// });

// function Account(o){
//   this.name = o.name;
//   this.dateCreated = new Date();
//   this.color = o.color;
//   this.photo = o.photo;
//   this.type = o.type;
//   this.pin = o.pin;
//   this.balance = o.deposit * 1;
//   this.numTract = 0;
//   this.transactions = [];
//   this.xferIds = [];
// }

// Account.create = function(o, cb){
//   var a = new Account(o);
//   Account.collection.save(function(cb){ throw cb;});
// };
//
// Account.findAll = function(cb){
//   Account.collection.find({}, {sort:{name:1}, fields:{name:1, color:1, balance:1, type:1, opened:1}}).toArray(function(err, accounts){
//     cb(err, accounts);
//   });
// };



var api = {
  // findUserByCredentials: findUserByCredentials,
  // findUserByUsername: findUserByUsername,
  // findUserById: findUserById,
    createAccount: createAccount,
    findAll: findAll,
    transaction:transaction,
    findByIdLite:findByIdLite
};
return api;
function createAccount(account){
  var a=new Account(account);
  console.log(a);
    console.log('account creation db call');
  return Account.create(account);
console.log(a);
  // var a = new Account(o);
  // Account.collection.save(a, cb);
}

function findAll(){
  console.log("db call");
  return Account.find();
}
//
// Account.findById = function(id, cb){
//   id = makeOid(id);
//   Account.collection.findOne({_id:id}, function(err, account){
//     async.map(account.xferIds, function(tId, done){
//       makeTransfer(tId, done, account.name);}, function(err, transfers){
//         account.transfers = transfers;
//         cb(account);
//       });
//   });
// };
//
function findByIdLite(id, cb){
  id = makeOid(id);
   return Account.findOne({_id:id}, {fields:{name:1, type:1}}, function(err, account){
    cb(account);
  });
}
function deposit(obj, cb){
  var id = makeOid(obj.id);
  var query = {_id:id};
  var fields = {fields:{balance:1, pin:1, numTract:1}};
  var deposit = _.cloneDeep(obj);
  deposit.amount *= 1;
  return Account.findOne(query, fields, function(err, a){
    if(obj.pin){
      //a.balance += deposit.amount;
      deposit.id = 1;
      deposit.fee = '';
      deposit.date = new Date();
      delete deposit.pin;
      Account.collection.update(query, {$set:{balance:deposit.amount}, $inc:{numTract:1}, $push:{transactions:deposit}}, function(){
        if(cb){cb();}
      });
    }else{
      if(cb){cb();}
    }
  });
}

function withdraw(obj, cb){
return 0;
}

function transaction(obj, cb){
  if(obj.type === 'deposit'){
    return deposit(obj, cb);
  }else{
    return withdraw(obj, cb);
  }
}


}

exports.account_create_get = function(req, res, next) {

    //Get all users , which we can use for adding to our account.
    async.parallel({
        users: function(callback) {
            userModel.findAll(callback)
        }
    }, function(err, results) {
        if (err) { return next(err); }
        res.render('account.view', { title: 'Create Account',authors:results.users });
    });

};
