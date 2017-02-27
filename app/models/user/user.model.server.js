var mongoose      = require("mongoose");

module.exports = function() {

    var UserSchema = new mongoose.Schema(
        {

            username: String,
            password: String,
            firstName: String,
            lastName: String,
            email: String,

            roles: [String]
        }, {collection: "user"});

    var user = mongoose.model('user', UserSchema);

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

     function findUserByCredentials(credentials) {
         return user.findOne(
             {
                 username: credentials.username,
                 password: credentials.password
             }
         );
     }
 }
