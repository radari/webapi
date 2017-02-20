(function()
{
    angular
        .module("BankAPP")
        .controller("DepositCtrl", DepositCtrl);

    function DepositCtrl($scope, $location, $rootScope, TransactionService)
    {
        $scope.deposit = deposit;

console.log("deposit processing")
        function deposit(transaction)
        {
            if(transaction)
            TransactionService
                .deposit(transaction)
                .then(
                    function(response)
                    {
                        $rootScope.currentUser = response.data;
                        $location.url("/home");
                    },
                    function(err) {
                        $scope.error = err;
                    }
                );
        }
    }

})();
