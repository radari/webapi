(function()
{
    angular
        .module("BankAPP")
        .controller("RegisterCtrl", RegisterCtrl);

    function RegisterCtrl($scope, $location, $rootScope, UserService)
    {
        $scope.register = register;

        function register(user)
        {
            if(user.password != user.password2 || !user.password || !user.password2)
            {
                $scope.error = "Your passwords doesn't match";
            }
            else
            {
                UserService
                    .register(user)
                    .then(
                        function(response) {
                            var user = response.data;
                            if(user != null) {
                                $rootScope.currentUser = user;
                                $location.url("/profile");
                            }
                        },
                        function(err) {
                            $scope.error = err;
                        }
                    );
            }
        }
    }
})();
