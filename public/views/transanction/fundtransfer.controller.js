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




$scope.tFrom=tFrom;
          //helper functions
          function tFrom(accounts, id){
             var index = accounts.map(function(o){return o._id.toString();}).indexOf(id);
             return accounts[index].name;
             console.log(account[index].name);
           };
$scope.tOptions=tFrom;
           function tOptions(accounts, id){
             var index = accounts.map(function(o){return o._id.toString();}).indexOf(id);
             accounts.splice(index, 1);
             var options = accounts.map(function(a){return '<option value="' + a._id.toString() + '">' + a.name + '</option>';});
             console.log(options.join(''));
             return options.join('');


           };
    }
})();
