(function()
{
    angular
        .module("BankAPP")
        .controller("AccountsListCtrl", AccountsListCtrl);

    function AccountsListCtrl($scope,$location, $rootScope, AccountService)
    {


      $scope.show=show;

      function show() {
        console.log('show method');
          AccountService
              .findAll()
              .then(handleSuccess, handleError);
      }

      function handleSuccess(response) {
        console.log("show accounts")
        $scope.accounts=response.data;
      }

      function handleError(error) {
          $scope.error = error;
      }
    }
})();
