(function(){
    angular
        .module("BankAPP")
        .factory("UserService", UserService);

    function UserService($http) {
        var api = {
            login: login,
            logout: logout,
            register: register,
            findAllUsers: findAllUsers,
            deleteUser: deleteUser,
            updateUser: updateUser,
            createUser: createUser
        };
        return api;

        function logout() {
            return $http.post("/api/logout");
        }

        function createUser(user) {
            return $http.post('/api/user', user);
        }

        function updateUser(userId, user) {
            return $http.put('/api/user/'+userId, user);
        }

        function deleteUser(userId) {
            return  $http({
            url: 'http://localhost:3000/api/user/'+userId,
            method: 'DELETE'

    })

            //$http.delete('/api/user/'+userId);
        }

        function findAllUsers() {
          console.log("list user");
            return $http.get("/api/user");
        }

        function register(user) {
            return $http.post("/api/register", user);
        }

        function login(user) {
          console.log("client call");
            return $http.post("/api/login", user);
        }
    }
})();
