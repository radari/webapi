(function(){
    angular
        .module("BankAPP")
        .factory("AccountService", AccountService);

    function AccountService($http) {
        var api = {
            create: create,
            findAll: findAll
            transfer: transfer
        };
        return api;
        function transfer(transfer) {
          console.log('clinetside transfer  service call');
            return $http.post('/api/accounts/'+_id, account);
              console.log('clinetside transfer service call');
        }

        function findAll() {
          console.log("clinet service for transfer");
            return $http.get('/api/transfer/'_id);
        }

        function findAllTransactions()
        {
          return $http.get('/api/transactions');
        }
    }
})();
