(function(){
    angular
        .module("BankAPP")
        .factory("AccountService", AccountService);

    function AccountService($http) {
        var api = {
            create: create,
            findAll: findAll,
            transfer: transfer
        };
        return api;
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
