var app=angular.module("myApp", ['config.settings','ngMaterial','ngMdIcons','ngCordova','cgBusy','ui.router']);

app.directive('uiMobileBackButton', function() {
    return {
        restrict: 'E',
        templateUrl: 'common/directive/uiMobileBackButton.html',
        controller: function($window, $scope, $rootScope, $state) {
            $scope.print = function(e) {
                $window.history.back();
            }
            $scope.$on('hide-back-button', function(e, data) {
                $scope.hide = e.targetScope.hide;
            })
        }
    };
});

app.directive('uiFormatDate', function() {
    return {
        restrict: 'E',
        templateUrl: 'common/directive/uiFormatDate.html',
        scope: {
            dateOf: '@',
            dateStyle: '@'
        },
        link: function(scope,elem, attrs) {
            scope.$watch('dateOf', function(value) {
                scope.formatedDate = moment(attrs.dateOf).format(attrs.dateStyle);
            });
        }
    };
});

app.directive('docAddCard', function() {
    return {
        restrict: 'E',
        templateUrl: 'common/directive/addCard.html',
        link: function(scope, element, attrs) {
            scope.cardInfo = JSON.parse(attrs.cardInfo);
        },
        controller: 'addCardController as cardCtrl'
    };
});

app.directive('docAddImage', function() {
    return {
        restrict: 'E',
        scope: {
            imageInfo: "="
        },
        templateUrl: 'common/directive/addImage.html',
        controller: 'addImageController as imgCtrl'
    };
});

app.config(["$stateProvider", "$urlRouterProvider", "$mdThemingProvider", "$httpProvider",
    function($stateProvider, $urlRouterProvider, $mdThemingProvider,$httpProvider) {

      $stateProvider.state('login', {
           url: '/login',
           templateUrl: 'app/login.html',
           controller: 'loginController as loginCtrl',
           onEnter: function() {
           }
      })
      .state('unauthorized', {
              url: 'unauthorized',
              template: '<h1>Not Authorized</h1>'
      })
      .state('home', {
             url: '/home',
             templateUrl: 'app/search.html',
             controller: 'searchController as searchCtrl',
             onEnter: ['settings','$state',function(settings,$state){
                if(!settings.isAuthenticated){
                  $state.go('login');
                }
             }]
      })
      .state('advSearch', {
             url: '/advSearch',
             templateUrl: 'app/advSearch.html',
             controller: 'advSearchController as advSearchCtrl',
             onEnter: ['settings','$state',function(settings,$state){
                if(!settings.isAuthenticated){
                  $state.go('login');
                }
             }]
      })
      .state('display', {
           url: '/display/:searchKey/:textKey',
           templateUrl: 'app/display.html',
           controller: 'displayController as displayCtrl',
           onEnter: ['settings','$state',function(settings,$state){
                if(!settings.isAuthenticated){
                  $state.go('login');
                }
             }]
       })
      .state('displayFolder', {
           url: '/displayFolder/:objectid',
           templateUrl: 'app/display.html',
           controller: 'displayFolderController as displayCtrl',
           onEnter: ['settings','$state',function(settings,$state){
                if(!settings.isAuthenticated){
                  $state.go('login');
                }
             }]
       });       
     
    $urlRouterProvider.otherwise('/login');


}]);





