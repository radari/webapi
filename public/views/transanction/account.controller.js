(function()
{
    angular
        .module("BankAPP")
        .controller("AccountCtrl", AccountCtrl);

    function AccountCtrl($scope, $location, $rootScope, AccountService)
    {
        $scope.createAccount = createAccount;
        //$scope.findAllAccounts = findAllAccounts;
    //    $scope.remove=remove;

        function createAccount(accounts){
          AccountService
                    .create(accounts)
                    .then(handleSuccess, handleError);
          }

          function handleSuccess(response) {
            $scope.accounts=response.data;
            var account=response.data;

                $rootScope.name = name;
                $scope.accounts=response.data;
                $location.url("/home");
            }

          function handleError(error) {
              $scope.error = error;
          }
    }
})();
