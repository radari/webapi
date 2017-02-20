(function(){
    angular
        .module("BankAPP")
        .factory("TransactionService", TransactionService);

    function TransactionService($http) {
        var api = {
            logout: logout,
            withdrawl: withdrawl,
            deposit: deposit,
            findAllTransactions: findAllTransactions
        };
        return api;

        function logout() {
            return $http.post("/api/logout");
        }
        function withdrawl(transaction) {
            return $http.post('/api/withdraw', transaction);
        }
        function deposit(transaction) {
            return $http.post('/api/deposit', transaction);
        }

        function findAllTransactions()
        {
          return $http.get('/api/transactions');
        }
    }
})();
