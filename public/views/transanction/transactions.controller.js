(function()
{
    angular
        .module("BankAPP")
        .controller("TransactionsCtrl", TransactionsCtrl);

    function TransactionsCtrl($scope, $location, $rootScope, AccountService)
    {
        $scope.transactionInit = transactionInit;
          $scope.transaction = transaction;

        //$scope.findAllAccounts = findAllAccounts;
    //    $scope.remove=remove;
        function transactionInit(accounts){
          AccountService
                    .transactionInit(accounts)
                    .then(function(accounts) {
            $scope.transaction=response.data;
                $location.url("/home");
          },
          function(err) {
              $scope.error = error;
          });
        }


          function transaction(accounts){
            AccountService
                      .transactionInit(accounts)
                      .then(function(response) {
              $scope.transactions=response.data;
                  $location.url("/home");
            },
            function(err) {
                $scope.error = error;
            });

    }
})();
