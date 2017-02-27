'use strict';

var _ = require('lodash');
var async = require('async');
var Transfer = require('./transfers.model.server.js');
<<<<<<< HEAD
var user = require("../../models/user/user.model.server.js");

var Mongo = require('mongodb');
var mongoose = require('mongoose'), Schema = mongoose.Schema,construct = require('mongoose-construct');
module.exports = function() {


var Account = new mongoose.Schema(
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
// =======
//     }, {collection: "accounts"});
//    var AccountSchema = mongoose.model('AccountSchema', Account);
// >>>>>>> c99e5fc39682d7bae01d9be62e8b74406da2cf4a
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
// <<<<<<< HEAD
    createAccount: createAccount,
// =======
//     create: create,
// >>>>>>> c99e5fc39682d7bae01d9be62e8b74406da2cf4a
    findAll: findAll,
    transaction:transaction,
    findByIdLite:findByIdLite
};
return api;
// <<<<<<< HEAD
function createAccount(account){
  var a=new Account(account);
  console.log(a);
    console.log('account creation db call');
  return Account.create(account);
console.log(a);
// =======
// function create(account){
//     console.log('account creation db call');
//   return AccountSchema.create(account);
//
// >>>>>>> c99e5fc39682d7bae01d9be62e8b74406da2cf4a
  // var a = new Account(o);
  // Account.collection.save(a, cb);
}

function findAll(){
  console.log("db call");
// <<<<<<< HEAD
  return Account.find();
// =======
//   return AccountSchema.find();
// >>>>>>> c99e5fc39682d7bae01d9be62e8b74406da2cf4a
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
// <<<<<<< HEAD
   return Account.findOne({_id:id}, {fields:{name:1, type:1}}, function(err, account){
=======
//    return AccountSchema.findOne({_id:id}, {fields:{name:1, type:1}}, function(err, account){
// >>>>>>> c99e5fc39682d7bae01d9be62e8b74406da2cf4a
    cb(account);
  });
};
function deposit(obj, cb){
  var id = makeOid(obj.id);
  var query = {_id:id};
  var fields = {fields:{balance:1, pin:1, numTract:1}};
  var deposit = _.cloneDeep(obj);
  deposit.amount *= 1;
// <<<<<<< HEAD
  return Account.findOne(query, fields, function(err, a){
    if(obj.pin){
      //a.balance += deposit.amount;
      deposit.id = 1;
      deposit.fee = '';
      deposit.date = new Date();
      delete deposit.pin;
      Account.collection.update(query, {$set:{balance:deposit.amount}, $inc:{numTract:1}, $push:{transactions:deposit}}, function(){
// =======
  AccountSchema.findOne(query, fields, function(err, a){
    if(obj.pin === a.pin){
      a.balance += deposit.amount;
      deposit.id = a.numTract + 1;
      deposit.fee = '';
      deposit.date = new Date();
      delete deposit.pin;
      Account.collection.update(query, {$set:{balance:a.balance}, $inc:{numTract:1}, $push:{transactions:deposit}}, function(){
// >>>>>>> c99e5fc39682d7bae01d9be62e8b74406da2cf4a
        if(cb){cb();}
      });
    }else{
      if(cb){cb();}
    }
  });
};

function withdraw(obj, cb){
// <<<<<<< HEAD
return 0;
}
// =======
  var id = makeOid(obj.id);
  var query = {_id:id}, fields = {fields:{balance:1, pin:1, numTract:1}};
  var withdraw = _.cloneDeep(obj);
  withdraw.amount *= 1;
  AccountSchema.findOne(query, fields, function(err, a){
    console.log(err, a, withdraw);
    if(obj.pin === a.pin){
      a.balance -= withdraw.amount;
      a.balance -= (a.balance < 0) ? 50 : 0;
      withdraw.id = a.numTract + 1;
      withdraw.fee = (a.balance < 0) ? 50 : '';
      withdraw.date = new Date();
      delete withdraw.pin;
      console.log(withdraw);
      AccountSchema.update(query, {$set:{balance:a.balance}, $inc:{numTract:1}, $push:{transactions:withdraw}}, function(){
        if(cb){cb();}
      });
    }else{
      console.log('pin does not matced')
      if(cb){cb();}
    }
  });
};
// >>>>>>> c99e5fc39682d7bae01d9be62e8b74406da2cf4a

function transaction(obj, cb){
  if(obj.type === 'deposit'){
    return AccountSchema.deposit(obj, cb);
  }else{
    return AccountSchema.withdraw(obj, cb);
  }
};
//
// Account.transfer = function(obj, cb){
//   obj.fromId = makeOid(obj.fromId);
//   obj.toId = makeOid(obj.toId);
//   obj.amount *= 1;
//   var total = obj.amount + 25;
//   Account.collection.findOne({_id:obj.fromId}, {fields:{balance:1, pin:1}}, function(err, a){
//     if(obj.pin === a.pin && a.balance >= total){
//       a.balance -= total;
//       Account.collection.findOne({_id:obj.toId}, {fields:{name:1}}, function(err, acct){
//         obj.to = acct.name;
//         Transfer.save(obj, function(err, t){
//           Account.collection.update({_id:a._id}, {$set:{balance:a.balance}, $push:{xferIds:t._id}}, function(){
//             Account.collection.update({_id:obj.toId}, {$inc:{balance:obj.amount}, $push:{xferIds:t._id}}, function(){
//               if(cb){cb();}
//             });
//           });
//         });
//       });
//     }else{
//       if(cb){cb();}
//     }
//   });
// };

//module.exports = Account;

// <<<<<<< HEAD

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
// =======
// PRIVATE HELPER FUNCTION

function makeOid(id){
  return (typeof id === 'string') ? Mongo.ObjectID(id) : id;
}
// function makeTransfer(tId, cb, name){
//   Transfer.findById(tId, function(err, transfer){
//     if(transfer.from === name){
//       transfer.from = '';
//     }else{
//       transfer.to = '';
//       transfer.fee = '';
//     }
//     cb(null, transfer);
//   });
// }
}
// >>>>>>> c99e5fc39682d7bae01d9be62e8b74406da2cf4a
