(function()
{
    angular
        .module("BankAPP")
        .controller("DepositCtrl", DepositCtrl);

    function DepositCtrl($scope, $location, $rootScope, TransactionService)
    {
      $scope.init = function(n){
    $scope.toAccount = n;
  }
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
                      console.log("responce "+response.data);
                      var transaction=response.data;
                      if(transaction != null){
                        console.log("not empty")
                      $rootScope.currentUser=transaction;
                        $location.url("/home");
                      }
                    },
                    function(err) {
                        $scope.error = err;
                    }
                );
        }
    }

})();
