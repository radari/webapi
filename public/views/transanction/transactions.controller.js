(function()
{
    angular
        .module("BankAPP")
        .controller("TransactionsCtrl", TransactionsCtrl);

    function TransferCtrl($scope, $location, $rootScope, AccountService)
    {
        $scope.transactions = transactions;
        //$scope.findAllAccounts = findAllAccounts;
    //    $scope.remove=remove;
        function transactions(accounts){
          AccountService
                    .transactions(accounts)
                    .then(handleSuccess, handleError);
          }
          function handleSuccess(response) {
            $scope.transfers=response.data;
                $location.url("/home");
          }
          function handleError(error) {
              $scope.error = error;
          }
    }
})();
