(function()
{
    angular
        .module("BankAPP")
        .controller("LoginCtrl", LoginCtrl);

      function LoginCtrl($scope, $location, $rootScope, UserService)
      {
          $scope.login = login;
console.log("login cntrl");
          function login(user)
          {
            console.log("login successlogin cntrl");
              if(user)
              UserService
                  .login(user)
                  .then(
                      function(response)
                      {
                          $rootScope.currentUser = response.data;
                          $location.url("/profile");
                      },
                      function(err) {
                          $scope.error = err;
                      }
                  );
          }
      }

  })();
