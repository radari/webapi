'use strict';

var Mongo = require('mongodb');
Object.defineProperty(Transfer, 'collection', {
  get: function(){return global.mongodb.collection('transfers');}
});

function Transfer(o){
  this.id = o.id * 1;
  this.date = new Date();
  this.from = o.from;
  this.fromId = (typeof o.fromId === 'string') ? Mongo.ObjectID(o.fromId) : o.fromId;
  this.to = o.to;
  this.toId = (typeof o.toId === 'string') ? Mongo.ObjectID(o.toId) : o.toId;
  this.amount = o.amount * 1;
  this.fee = 25;
}

Transfer.save = function(o, cb){
  Transfer.collection.count(function(err, count){
    //console.log(count);
    o.id = count + 1;
    var t = new Transfer(o);
    Transfer.collection.save(t, cb);
  });
};

Transfer.findById = function(id, cb){
  id = (typeof id === 'string') ? Mongo.ObjectID(id) : id;
  Transfer.collection.findOne({_id:id}, cb);
};

module.exports = Transfer;



exports.tFrom = function(accounts, id){
  var index = accounts.map(function(o){return o._id.toString();}).indexOf(id);
  return accounts[index].name;
};

exports.tOptions = function(accounts, id){
  var index = accounts.map(function(o){return o._id.toString();}).indexOf(id);
  accounts.splice(index, 1);
  var options = accounts.map(function(a){return '<option value="' + a._id.toString() + '">' + a.name + '</option>';});
  //console.log(options.join(''));
  return options.join('');
};
