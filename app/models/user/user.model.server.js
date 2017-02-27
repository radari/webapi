var mongoose      = require("mongoose");
<<<<<<< HEAD

module.exports = function() {

    var UserSchema = new mongoose.Schema(
        {

            username: String,
            password: String,
            firstName: String,
            lastName: String,
            email: String,
            accountNumber: Number,
              balance : 0,
// =======
// >>>>>>> c99e5fc39682d7bae01d9be62e8b74406da2cf4a

            roles: [String]
        }, {collection: "user"});

// <<<<<<< HEAD
    var user = mongoose.model('user', UserSchema);
// =======
//     var UserSchema = new mongoose.Schema(
//         {
//             username: String,
//             password: String,
//             firstName: String,
//             lastName: String,
//             email: String,
//             accountNumber: Number,
//             balance : 0,
//             roles: [String]
//         }, {collection: "user"});
//
//     var UserModel = mongoose.model('UserModel', UserSchema);
// >>>>>>> c99e5fc39682d7bae01d9be62e8b74406da2cf4a

    var api = {
         findUserByCredentials: findUserByCredentials,
         findUserByUsername: findUserByUsername,
         findUserById: findUserById,
         findAllUsers: findAllUsers,
         createUser: createUser,
         removeUser: removeUser,
         updateUser: updateUser,
         getMongooseModel: getMongooseModel
     };
     return api;

     function updateUser(userId, user) {
// <<<<<<< HEAD
         return user.update({_id: userId}, {$set: user});
     }

     function removeUser(userId) {
         return user.remove({_id: userId});
     }

     function findAllUsers() {
       console.log("list users from dbs");
         return user.find();
     }
     function createUser(user) {
         return user.create(user);
     }

     function findUserByUsername(username) {
         return user.findOne({username: username});
     }

     function getMongooseModel() {
         return user;
     }

     function findUserById(userId) {
         return user.findById(userId);
     }

//      function findUserByCredentials(credentials) {
//          return user.findOne(
// // =======
//          return UserModel.update({_id: userId}, {$set: user});
//      }
//
//      function removeUser(userId) {
//          return UserModel.remove({_id: userId});
//      }
//
//      function findAllUsers() {
//          return UserModel.find();
//      }
//      function createUser(user) {
//          return UserModel.create(user);
//      }

    //  function findUserByUsername(username) {
    //      return UserModel.findOne({username: username});
    //  }
     //
    //  function getMongooseModel() {
    //      return UserModel;
    //  }
     //
    //  function findUserById(userId) {
    //      return UserModel.findById(userId);
    //  }

     function findUserByCredentials(credentials) {
         return user.findOne(
// >>>>>>> c99e5fc39682d7bae01d9be62e8b74406da2cf4a
             {
                 username: credentials.username,
                 password: credentials.password
             }
         );
     }
 }
