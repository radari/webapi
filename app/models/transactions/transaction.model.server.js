var mongoose      = require("mongoose");
var Schema = mongoose.Schema;

module.exports = function() {

    var TransactionSchema = new Schema(
        {
            userId:{type: Schema.Types.ObjectId, ref:'user'},
            toAccount: String,
            fromAccount: String,
            description: String,
            amount: Number,
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
    function findAllTransactionsByAccNo(accountNumber)
    {
      return TransactionModel.find({toAccount: accountNumber},function(err, transactions) {
        if( err || !transactions) console.log("No transaction users found");
        else TransactionModel.forEach( function(listtransaction) {
          console.log(listtransaction);
        } );
      });
    }
    function findAllTransactions()
    {
      return TransactionModel.find();
    }




}
