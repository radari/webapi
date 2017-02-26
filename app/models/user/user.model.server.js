var Mongo      = require("mongodb");

var User = function(u) {
  this.username= u.username;
  this.password= u.password;
  this.firstName= u.firstName;
  this.lastName= u.lastName;
  this.email= u.email;
  this.accountNumber= u.accountNumber;
  this.balance = u.balance * 1;
  this.roles= [];
};

Object.defineProperty(User, 'collection', {
  get: function(){
    return global.mongodb.collection('user');
  }
});


module.exports = function() {

    // var UserSchema = new mongoose.Schema(
    //     {
    //
    //     }, {collection: "user"});
    //
    // var User = mongoose.model('User', UserSchema);

    var api = {
         findUserByCredentials: findUserByCredentials,
         findUserByUsername: findUserByUsername,
         findUserById: findUserById,
         findAllUsers: findAllUsers,
         createUser: createUser,
         removeUser: removeUser,
         updateUser: updateUser //,
        // getMongooseModel: getMongooseModel
     };
     return api;

     function updateUser(userId, user) {
         return User.collection.update({_id: userId}, {$set: user});
     }

     function removeUser(userId) {
         return User.collection.remove({_id: userId});
     }

     function findAllUsers() {
         return User.collection.find();
     }
     function createUser(user) {
         return User.collection.create(user);
     }

     function findUserByUsername(username,cb) {
       console.log("byuser");
         return User.collection.findOne({username: username}, function(){
             if(cb){
               cb();
             }
           });
     }

    //  function getMongooseModel() {
    //      return User;
    //  }

     function findUserById(userId) {
         return User.collection.findById(userId);
     }

     function findUserByCredentials(credentials) {
         return User.collection.findOne(
             {
                 username: credentials.username,
                 password: credentials.password
             }
         );
     }
 }
