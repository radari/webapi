'use strict';

var _ = require('lodash');
var async = require('async');
//var Transfer = require('./transfers.model.server.js');
var Mongo = require('mongodb');
//var mongoose = require('mongoose'), Schema=mongoose.Schema, construct=require('mongoose-construct')

Object.defineProperty(Account, 'collection', {
  get: function(){return global.mongodb.collection('accounts');}
});

function Account(o){
  this.name = o.name;
  this.dateCreated = new Date();

  this.type = o.type;
  this.pin = o.pin;
  this.balance = o.deposit * 1;
  this.numTract = 0;
  this.transactions = [];
  this.xferIds = [];
}
module.exports=Account;
module.exports = function() {
// var AccountSchema = new Schema(
//     {
//         name: {type:String, default:'default'},
//         dateCreated: {type: Date, default: Date.now },
//         type:{type:String, default:'default'} ,
//         pin: {type:Number, default:6341},
//         balance:{type:Number, default:0} ,
//         numTract:{type:Number, default:0},
//         transactions: [],
//         xferIds:[]
//
//     }, {collection: "accounts"});
//     AccountSchema.plugin(construct);
//
//     AccountSchema.pre('construct',function(next){
//       console.log("costructor called");
//       next();
//
//     });
//  mongoose.model('Account', AccountSchema );

 // AccountSchema.schema.createInstance = function (name, dateCreated,
 //   type,pin,balance,numTract,transactions,xferIds) {
 //  var Account = mongoose.model('Account');
 //  return new Account({
 //   name: name,
 //   dateCreated: dateCreated,
 //   type: type,
 //   pin: pin,
 //   balance:balance,
 //   numTract:numTract,
 //   transactions:transactions,
 //   xferIds:xferIds
 //  });
 // };

//  var Account=mongoose.model('Account', AccountSchema);
//  var a=new Account();
// console.log("before");
//  console.log(a);
//  console.log("after");


  //  function Accounts(o){
  //    this.name = o.name;
  //    this.dateCreated = new Date();
  //    this.type = o.type;
  //    this.pin = o.pin;
  //    this.balance = o.deposit * 1;
  //    this.numTract = 0;
  //    this.transactions = [];
  //    this.xferIds = [];
  //  }



var api = {

    Account: Account,
    findAll: findAll,
    transaction:transaction,
    findByIdLite:findByIdLite
};
return api;
function Account(o,cb){
  console.log(o);
  console.log("test run");
  var a = new Account(o);
  console.log("run test")
  console.log(a);

  Account.save(a, cb);
 // var a = new Account(account);
 //  console.log("test+++");
 //  console.log(Account)
 //  console.log(a);
 //    console.log('account creation db call');
 //  return Account.create(a,cb);


}



function findAll(){
  console.log("db call");
  return Account.collection.find();
}

function findByIdLite(id, cb){
  id = makeOid(id);
   return Account.collection.findOne({_id:id}, {fields:{name:1, type:1}}, function(err, account){
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

  return Account.findOne(query, fields, function(err,a){
  //  console.log(a +"   aaaa" );
    if(obj.pin === a.pin){
      a.balance += deposit.amount;
      deposit.id = a.numTract + 1;
      deposit.fee = '';
      deposit.date = new Date();
      delete deposit.pin;
    Account.collection.update(query,
       {$set:{balance:a.balance}, $inc:{numTract:1}, $push:{transactions:deposit}}, function(){
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
  Account.collection.findOne(query, fields, function(err, a){
    console.log(err, a, withdraw);
    if(obj.pin === a.pin){
      a.balance -= withdraw.amount;
      a.balance -= (a.balance < 0) ? 50 : 0;
      withdraw.id = a.numTract + 1;
      withdraw.fee = (a.balance < 0) ? 50 : '';
      withdraw.date = new Date();
      delete withdraw.pin;
      console.log(withdraw);
      Account.collection.update(query, {$set:{balance:a.balance}, $inc:{numTract:1}, $push:{transactions:withdraw}}, function(){
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
