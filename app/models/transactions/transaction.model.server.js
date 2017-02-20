var mongoose      = require("mongoose");
var Schema = mongoose.Schema;

module.exports = function() {

    var TransactionSchema = new Schema(
        {
            userId:{type: Schema.Types.ObjectId, ref:'user'},
            toAccount: String,
            fromAccount: String,
            description: String,
            transfertype: String,

        }, {collection: "transaction"});

    var TransactionModel = mongoose.model('TransactionModel', TransactionSchema);

    var api = {
      // findUserByCredentials: findUserByCredentials,
      // findUserByUsername: findUserByUsername,
      // findUserById: findUserById,
        withdrawl: withdrawl,
        deposit: deposit,
        findAllTransactions: findAllTransactions,
        getMongooseModel: getMongooseModel
    };
    return api;

    function withdrawl(transaction)
    {
      return TransactionModel.create(transaction);
    }
    function deposit(transaction)
    {
      return TransactionModel.create(transaction);
    }

    function getMongooseModel() {
        return TransactionModel;
    }
    function findAllTransactions(transaction)
    {
      return TransactionModel.find();
    }

    // function findUserByUsername(username) {
    //     return UserModel.findOne({username: username});
    // }
    //
    // function getMongooseModel() {
    //     return UserModel;
    // }
    //
    // function findUserById(userId) {
    //     return UserModel.findById(userId);
    // }
    //
    // function findUserByCredentials(credentials) {
    //     return UserModel.findOne(
    //         {
    //             username: credentials.username,
    //             password: credentials.password
    //         }
    //     );
  //  }


}
