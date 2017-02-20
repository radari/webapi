(function(){
    angular
        .module("PassportApp")
        .factory("TransactionService", TransactionService);

    function TransactionService($http) {
        var api = {
            logout: logout,
            withdrawl: withdrawl,
            deposit: deposit
        };
        return api;

        function logout() {
            return $http.post("/api/logout");
        }
        function withdrawl(transaction) {
            return $http.post('/api/transaction', transaction);
        }
        function deposit(transaction) {
            return $http.post('/api/transaction', transaction);
        }
    }
})();
