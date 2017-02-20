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
            if(transaction)
            TransactionService
                .withdrawl(transaction)
                .then(
                    function(response)
                    {
                        $rootScope.currentUser = response.data;
                        $location.url("/withdraw");
                    },
                    function(err) {
                        $scope.error = err;
                    }
                );
        }

      }

})();
