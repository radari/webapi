var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var mongoose         = require("mongoose");
// <<<<<<< HEAD
// //var Mongo      = require("mongodb");
// =======
// >>>>>>> c99e5fc39682d7bae01d9be62e8b74406da2cf4a

module.exports = function(app) {

    var userModel = require("../../models/user/user.model.server.js")();
    console.log(userModel);

    var auth = authorized;
    app.post  ('/api/login', passport.authenticate('local'), login);
    app.post  ('/api/logout',         logout);
    app.post  ('/api/register',       register);
    app.post  ('/api/user',     auth, createUser);
    app.get   ('/api/loggedin',       loggedin);
    app.get   ('/api/user',      findAllUsers);
    app.put   ('/api/user/:id', auth, updateUser);
    app.delete('/api/user/:id',  deleteUser);
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials({username: username, password: password})
        .then(
            function(user) {
                if (!user) { return done(null, false); }
                return done(null, user);
            },
            function(err) {
                if (err) { return done(err); }
            }
        );
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}

function login(req, res) {
  console.log("service call");
    var user = req.user;
    res.json(user);
}

function loggedin(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
}

function logout(req, res) {
    req.logOut();
    res.send(200);
}

function register(req, res) {
    var newUser = req.body;
    newUser.roles = ['customer'];

    userModel
        .findUserByUsername(newUser.username)
        .then(
            function(user){
                if(user) {
                    res.json(null);
                } else {
                    return userModel.createUser(newUser);
                }
            },
            function(err){
                res.status(400).send(err);
            }
        )
        .then(
            function(user){
                if(user){
                    req.login(user, function(err) {
                        if(err) {
                            res.status(400).send(err);
                        } else {
                            res.json(user);
                        }
                    });
                }
            },
            function(err){
                res.status(400).send(err);
            }
        );
}

function findAllUsers(req, res) {
  console.log("list users from service server");
    if(isAdmin(req.user)) {
        userModel
            .findAllUsers()
            .then(
                function (users) {
                    res.json(users);
                },
                function () {
                    res.status(400).send(err);
                }
            );
    } else {
        res.status(403);
    }
}

function deleteUser(req, res) {


        userModel
            .removeUser(req.params.id)
            .then(
                function(user){
                    return userModel.findAllUsers();
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(err){
                    res.status(400).send(err);
                }
            );

}

function updateUser(req, res) {
    var newUser = req.body;
    if(!isAdmin(req.user)) {
        delete newUser.roles;
    }
    if(typeof newUser.roles == "string") {
        newUser.roles = newUser.roles.split(",");
    }

    userModel
        .updateUser(req.params.id, newUser)
        .then(
            function(user){
                return userModel.findAllUsers();
            },
            function(err){
                res.status(400).send(err);
            }
        )
        .then(
            function(users){
                res.json(users);
            },
            function(err){
                res.status(400).send(err);
            }
        );
}

function createUser(req, res) {
    var newUser = req.body;
    if(newUser.roles && newUser.roles.length > 1) {
        newUser.roles = newUser.roles.split(",");
    } else {
        newUser.roles = ["customer"];
    }

    // first check if a user already exists with the username
    userModel
        .findUserByUsername(newUser.username)
        .then(
            function(user){
                // if the user does not already exist
                if(user == null) {
                    // create a new user
                    return userModel.createUser(newUser)
                        .then(
                            // fetch all the users
                            function(){
                                return userModel.findAllUsers();
                            },
                            function(err){
                                res.status(400).send(err);
                            }
                        );
                // if the user already exists, then just fetch all the users
                } else {
                    return userModel.findAllUsers();
                }
            },
            function(err){
                res.status(400).send(err);
            }
        )
        .then(
            function(users){
                res.json(users);
            },
            function(){
                res.status(400).send(err);
            }
        )
}

function isAdmin(user) {
    if(user.roles.indexOf("admin") > 0) {
        return true
    }
    return false;
}

function authorized (req, res, next) {
    if (!req.isAuthenticated()) {
        res.send(401);
    } else {
        next();
    }
};
}
