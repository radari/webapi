(function()
{
    angular
        .module("BankAPP")
        .controller("WithdrawnCtrl", WithdrawnCtrl);

    function WithdrawnCtrl($scope, $location, $rootScope, TransactionService)
    {
        $scope.withdrawl = withdrawl;
      //  $scope.deposit = deposit;

        function withdrawl(transaction)
        {
          
            TransactionService
                .withdrawl(transaction)
                .then(function(transaction){
                      $location.url("/home");
                    },
                    function(err) {
                        $scope.error = err;
                    }
                );
        }

      }

})();
