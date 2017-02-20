
module.exports = function(app) {

    var userService = require("./services/user/user.service.server.js")(app);
    var transactionService = require("./services/transactions/transaction.service.server.js")(app);

}
