
module.exports = function(app) {

    var userService = require("./services/user/user.service.server.js")(app);
    var transactionService = require("./services/transactions/transaction.service.server.js")(app);
    var transactionService = require("./services/accounts/account.service.server.js")(app);



}
// exports.account_create_get = function(req, res, next) {
//
//     //Get all users , which we can use for adding to our account.
//     async.parallel({
//         users: function(callback) {
//             userService.findAll(callback)
//         }
//     }, function(err, results) {
//         if (err) { return next(err); }
//         res.render('account.view', { title: 'Create Account',authors:results.users });
//     });
//
// };
