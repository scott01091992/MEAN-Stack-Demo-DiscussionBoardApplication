myApp.config(function ($routeProvider){
  $routeProvider
    .when('/login',{
      templateUrl: '../partials/signin.html'
    })
    .when('/dashboard',{
      templateUrl: '../partials/dashboard.html'
    })
    .when('/topic',{
      templateUrl: '../partials/topic.html'
    })
    .when('/user/:id',{
      templateUrl: '../partials/user.html'
    })
    .otherwise({
      redirectTo: '/login'
    })
});
