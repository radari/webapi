(function()
{
    angular
        .module("BankAPP")
        .controller("TransferCtrl", TransferCtrl);

    function TransferCtrl($scope, $location, $rootScope, AccountService)
    {
      $scope.transferInit = transferInit;
        $scope.transfer = transfer;
        //$scope.findAllAccounts = findAllAccounts;
    //    $scope.remove=remove;

    function transferInit(accounts)
    {
      AccountService
                .transferInit(accounts)
                .then(handleSuccess, handleError);
      }
      function handleSuccess(response) {
        $scope.transfers=response.data;
            $location.url("/home");
      }
      function handleError(error) {
          $scope.error = error;
    }
        function transfer(accounts){

          AccountService
                    .transfer(accounts)
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
