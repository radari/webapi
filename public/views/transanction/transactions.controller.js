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
                    .then(function(accounts){
                      $scope.transaction=accounts.data;
                      console.log(transaction);
                      $location.url("/home");
                    },
                    function(err) {
                      $scope.error = err;
                    }
                  );
        }


          function transaction(accounts){
            AccountService
                      .transaction(accounts)
                      .then(function(accounts) {
                        $scope.dw=accounts.data;
                        console.log($scope.dw);
                        $location.url("/home");
                      },
                      function(err) {
                        $scope.error = err;
                      });
          }
    }
})();
