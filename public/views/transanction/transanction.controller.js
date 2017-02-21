(function()
{
    angular
        .module("BankAPP")
        .controller("TransactionCtrl", TransactionCtrl);

    function TransactionCtrl($scope, $location, $rootScope, TransactionService, UserService)
    {

$scope.findAllTransactionsByAccNo=findAllTransactionsByAccNo;
$scope.findAllTransactions=findAllTransactions;
      function findAllTransactions() {
          TransactionService
              .findAllTransactions()
              .then(handleSuccess, handleError);
      }
      var account=UserService.user;
      function findAllTransactionsByAccNo(account) {
          TransactionService
              .findAllTransactionsByAccNo(account.accountNumber,user)
              .then(handleSuccess, handleError);
      }
      //init();
      function handleSuccess(response) {
          $scope.users = response.data;
      }

      function handleError(error) {
          $scope.error = error;
      }
    }

})();
