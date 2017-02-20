(function()
{
    angular
        .module("PassportApp")
        .controller("DepositCtrl", DepositCtrl);

    function DepositCtrl($scope, $location, $rootScope, TransactionService)
    {
        $scope.deposit = deposit;


        function deposit(transaction)
        {
            if(transaction)
            TransactionService
                .deposit(transaction)
                .then(
                    function(response)
                    {
                        $rootScope.currentUser = response.data;
                        $location.url("/deposit");
                    },
                    function(err) {
                        $scope.error = err;
                    }
                );
        }
    }

})();
