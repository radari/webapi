'use strict';

var _ = require('lodash');
var async = require('async');
var Transfer = require('./transfers.model.server.js');
var Mongo = require('mongodb');
var mongoose = require('mongoose');
module.exports = function() {
var Account = new mongoose.Schema(
    {
        name: String,
        dateCreated: {type: Date, default: Date.now },
        type: String,
        pin: Number,
        balance: Number,
        transfertype: String,
        numTract: Number,
        transactions: [],
        xferIds:[]

    }, {collection: "accounts"});
   var AccountSchema = mongoose.model('AccountSchema', Account);


var api = {

    create: create,
    findAll: findAll,
    transaction:transaction,
    findByIdLite:findByIdLite
};
return api;
function create(account){
    console.log('account creation db call');
  return AccountSchema.create(account);


}

function findAll(){
  console.log("db call");
  return AccountSchema.find();
}

function findByIdLite(id, cb){
  id = makeOid(id);
   return AccountSchema.findOne({_id:id}, {fields:{name:1, type:1}}, function(err, account){
    cb(account);
  });
}
function deposit(obj, cb){

  console.log("inside deposit");
  console.log(obj);
  var id = makeOid(obj.id);
  console.log(id);
  var query = {_id:id};
  var fields = {fields:{balance:1, pin:1, numTract:1}};
  var deposit = _.cloneDeep(obj);
  console.log(deposit);
  deposit.amount *= 1;
  return AccountSchema.findOne(query, fields, function(err, a){
    console.log(a +"   aaaa" );
    if(obj.pin === a.pin){
      a.balance += deposit.amount;
      deposit.id = a.numTract + 1;
      deposit.fee = '';
      deposit.date = new Date();
      delete deposit.pin;
    AccountSchema.update(query, {$set:{balance:a.balance}, $inc:{numTract:1}, $push:{transactions:deposit}}, function(){
        if(cb){cb();}
      });
    }else{
      if(cb){cb();}
    }
  });
}

function withdraw(obj, cb){
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
}

function transaction(obj, cb){
  if(obj.type === 'deposit'){
    return deposit(obj, cb);
  }else{
    return withdraw(obj, cb);
  }
}

}
// PRIVATE HELPER FUNCTION

function makeOid(id){
  console.log(id);
  return (typeof id === 'string') ? mongoose.Schema.Types.ObjectId(id) : id;
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
