(function () {
    "use strict";
    angular
        .module("myApp")
        .controller("loginController",
                    ["$scope","loginFactory",'$state','$mdToast', loginController]);

function loginController ($scope ,loginFactory, $state,$mdToast) {
      var loginCtrl = this;
      loginCtrl.user ={}; 
      $scope.showinvaldMsg = true;
      function init() {

          var last = {
            bottom: false,
            top: true,
            left: false,
            right: true
          };
          $scope.contentError ='Server Error!';

          $scope.toastPosition = angular.extend({},last);
          $scope.getToastPosition = function() {
            sanitizePosition();
            return Object.keys($scope.toastPosition)
              .filter(function(pos) { return $scope.toastPosition[pos]; })
              .join(' ');
          };
          function sanitizePosition() {
            var current = $scope.toastPosition;
            if ( current.bottom && last.top ) current.top = false;
            if ( current.top && last.bottom ) current.bottom = false;
            if ( current.right && last.left ) current.left = false;
            if ( current.left && last.right ) current.right = false;
            last = angular.extend({},current);
          }
      }
      init();

  loginCtrl.checkLogin =function(user){

          var inValidPopup =   setTimeout(function(){ 
                        $scope.isLoading = false;
                             $mdToast.show(
                              $mdToast.simple()
                                .content('Invalid User!')
                                .position($scope.getToastPosition())
                                .hideDelay(2000)
                             ); 
                           }, 10000);
              

          $scope.isLoading =  loginFactory.checkAccess(user).then(
                function (response) {
                        //  console.log('LoginCtrl - success - authorized',JSON.stringify(response));
                    clearTimeout(inValidPopup);
                    $state.go('home');
                },function(error) {
                    clearTimeout(inValidPopup);
                        //  console.log('LoginCtrl - error - not authorized',JSON.stringify(error));
                        if(error.data != undefined && error.data.status == 401){
                            $scope.contentError ='Invalid User!';  
                        }
                        else if(error.status == 401){
                            $scope.contentError ='Invalid User!'; 
                        }
                        else{
                            $scope.contentError ='Server Error!';
                        }
                         $mdToast.show(
                              $mdToast.simple()
                                .content($scope.contentError)
                                .position($scope.getToastPosition())
                                .hideDelay(3000)
                            );
                 });
      };

};
}());