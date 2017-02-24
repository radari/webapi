var mongoose      = require("mongoose");
var Schema = mongoose.Schema;

'use strict';

var Mongo = require('mongodb');

var TransactionSchema  = new mongoose.Schema( {
 //id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  accountId :{ type: Schema.Types.ObjectId, ref:'accounts' },
  date :{type:Date, default:Date.now} ,
  type :String,
  amount:Number,
pin: Number }
  , {collection: "transactions"});
  var Transaction = mongoose.model('Transaction', TransactionSchema);

// Object.defineProperty(Transaction, 'collection', {
//   get: function(){
//     return global.mongodb.collection('transactions');
//   }
// });

Transaction.create = function(o, cb) {
  var transaction = new Transaction(o);
  Transaction.collection.save(transaction, function(){
    cb(transaction);
  });
};

Transaction.findByAccountId = function(accountId, cb) {
  Transaction.collection.find({
    accountId: Mongo.ObjectID(accountId)
  }).toArray(cb);
};

module.exports = Transaction;
