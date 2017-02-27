'use strict';

var Mongo = require('mongodb');
var Transaction = function(t) {
  this.accountId = Mongo.ObjectID(t.accountId);
  this.date = new Date(t.date);
  this.type = t.type;
  this.amount = t.amount * 1;
};
//module.exports = Transaction;
module.exports = function() {

  var Transaction = function(t) {
    this.accountId = Mongo.ObjectID(t.accountId);
    this.date = new Date(t.date);
    this.type = t.type;
    this.amount = t.amount * 1;
  };

  var api = {
    // findUserByCredentials: findUserByCredentials,
    // findUserByUsername: findUserByUsername,
    // findUserById: findUserById,
      create: create,
      findByAccountId: findByAccountId;
  };


var Transaction = function(t) {
  this.accountId = Mongo.ObjectID(t.accountId);
  this.uid=t.uid,
  this.date = new Date(t.date);
  this.type = t.type;
  this.amount = t.amount * 1;
};

Object.defineProperty(Transaction, 'collection', {
  get: function(){
    return global.mongodb.collection('transactions');
  }
});


function create(o, cb) {
  var transaction = new Transaction(o);
  Transaction.collection.save(transaction, function(){
    cb(transaction);
  });
};


function findByAccountId(accountId, cb) {
  Transaction.collection.find({
    accountId: Mongo.ObjectID(accountId)
  }).toArray(cb);
};

//module.exports = Transaction;
}
