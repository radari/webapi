(function() {
    angular.module("BankAPP")
        .config(function($routeProvider, $httpProvider) {
            $routeProvider
              .when('/home', {
                  templateUrl: 'views/home/home.view.html',
                  controller: 'HomeController',
                  resolve: {
                      loggedin: checkCurrentUser
                  }
              })
              .when('/profile', {
                  templateUrl: 'views/profile/profile.view.html',
                  controller: 'ProfileCtrl',
                  resolve: {
                      loggedin: checkLoggedin
                  }
              })
              .when('/admin', {
                  templateUrl: 'views/admin/admin.view.html',
                  controller: 'AdminController',
                  resolve: {
                      loggedin: checkAdmin
                  }
              })
              .when('/login', {
                  templateUrl: 'views/login/login.view.html',
                  controller: 'LoginCtrl',
                  controllerAs: 'model'
              })
              .when('/register', {
                  templateUrl: 'views/register/register.view.html',
                  controller: 'RegisterCtrl',
                  controllerAs: 'model'
              })
              .when('/withdraw',{
                templateUrl:'views/transanction/withdraw.view.html',
                controller:'WithdrawnCtrl',
                controllerAs:'model'
              })
              .when('/transfer',{
                templateUrl:'views/transanction/fundtransfer.view.html',
                controller:'TransferCtrl',
                controllerAs:'model'
              })
              .when('/transaction',{
                templateUrl:'views/transanction/transactions.view.html',
                controller:'TransactionsCtrl',
                controllerAs:'model',
                resolve: {
                    loggedin: checkCurrentUser
                }
              })
              .when('/transactions',{
                templateUrl:'views/transanction/transaction.view.html',
                controller:'TransactionCtrl',
              })
              .when('/summery',{
                templateUrl:'views/transanction/summary.view.html',
              })
              .when('/deposit',{
                templateUrl:'views/transanction/deposit.view.html',
                controller:'DepositCtrl',
                controllerAs:'model'
              })
              .when('/addAccount',{
                templateUrl:'views/transanction/account.view.html',
                controller:'AccountCtrl',
                controllerAs:'model'
              })
              .when('/accounts',{
                templateUrl:'views/transanction/accountslist.view.html',
                controller:'AccountsListCtrl'

              })
              .otherwise({
                  redirectTo: '/home'
              });
        });

    var checkAdmin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0' && user.roles.indexOf('admin') != -1)
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
        });

        return deferred.promise;
    };


    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
            }
            deferred.resolve();
        });

        return deferred.promise;
    };


})();
