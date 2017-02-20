(function()
{
    angular
        .module("BankAPP")
        .controller("TransactionCtrl", TransactionCtrl);

    function TransactionCtrl($scope, $location, $rootScope, TransactionService)
    {

      function init() {
          TransactionService
              .findAllTransactions()
              .then(handleSuccess, handleError);
      }
      init();
      function handleSuccess(response) {
          $scope.users = response.data;
      }

      function handleError(error) {
          $scope.error = error;
      }
    }

})();
