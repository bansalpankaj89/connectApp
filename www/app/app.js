var app=angular.module("myApp", ['ngMaterial','ngMdIcons','ngCordova','cgBusy','ui.router']);

app.config(["$stateProvider", "$urlRouterProvider", "$mdThemingProvider", "$httpProvider",
    function($stateProvider, $urlRouterProvider, $mdThemingProvider,$httpProvider) {

      $stateProvider
      .state('home', {
             url: '/home',
             templateUrl: 'app/home.html',
             controller: 'homeController as homeCtrl',
             resolve: {
                    userlist: function ($stateParams, homeFactory) {
                        return homeFactory.getUsers();
                    }
             }
      })  
     
    $urlRouterProvider.otherwise('/home');


}]);





