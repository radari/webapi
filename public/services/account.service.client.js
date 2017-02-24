(function(){
    angular
        .module("BankAPP")
        .factory("AccountService", AccountService);

    function AccountService($http) {
        var api = {
            create: create,
            findAll: findAll,
            transferInit:transferInit,
            transfer: transfer,
            transactionInit:transactionInit,
            transaction:transaction
        };
        return api;


function transactionInit(accounts)
{
  console.log('deposit/vithdraw init call');
  $http.get('/api/accounts/transactionInit', accounts)
}

function transaction(accounts)
{
  console.log('deposit/vithdraw call');
  $http.put('/api/accounts/transaction', accounts)
}

        function create(accounts) {
          console.log('clinetside accounts  service call');
            return $http.post('/api/accounts/', accounts);
              console.log('clinetside accounts service call');
        }

        function transfer(transfer) {
          console.log('clinetside transfer  service call');
          return $http.post('/api/accounts/transfer/', transfer);
              console.log('clinetside transfer service call');
        }

      function findAll()
      {      console.log('clinetside all accounts service call');
         return $http.get('/api/accounts');
        }
    }
})();
