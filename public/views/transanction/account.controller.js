(function()
{
    angular
        .module("BankAPP")
        .controller("AccountCtrl", AccountCtrl);

    function AccountCtrl($scope, $location, $rootScope, AccountService, UserService)
    {
      $scope.InitAccount=InitAccount;
        $scope.createAccount = createAccount;
      //  $scope.findAllUsers=findAllUsers;
        //$scope.findAllAccounts = findAllAccounts;
    //    $scope.remove=remove;
    function InitAccount() {
        UserService
            .findAllUsers()
            .then(function(response) {
                $scope.users = response.data;
                console.log(  $scope.users );
              $rootScope.uid=response._id;
            }, function(error) {
                $scope.error = error;
            });
    }
InitAccount();


        function createAccount(accounts){
          AccountService
                    .create(accounts)
                    .then(handleSuccess, handleError);
          }

          function handleSuccess(response) {
            $scope.accounts=response.data;
            $location.url("/home");
            }

          function handleError(error) {
              $scope.error = error;
          }
    }
})();
