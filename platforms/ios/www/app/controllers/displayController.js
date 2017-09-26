(function () {
    'use strict';
    angular
        .module('myApp')
        .controller('displayController',
                    ['$scope','$stateParams','$state','$mdBottomSheet','$mdToast','settings','displayFactory',displayController]);

function displayController ($scope,$stateParams,$state,$mdBottomSheet,$mdToast,settings,displayFactory) {

    var displayCtrl = this;
    displayCtrl.noDisplayList ='';
    displayCtrl.displayList = [];
    var originatorEv;
    displayCtrl.textSearch = $stateParams.textKey;
    displayCtrl.folderEnabled = true;
    displayCtrl.documentEnabled = true;
    displayCtrl.showFolder = true;
    displayCtrl.showDocument = true;
    displayCtrl.isOpen = false;
    $scope.reverse = false;

    function init() { 

           var last = {
            bottom: false,
            top: true,
            left: false,
            right: true
          };

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
          };

          if($stateParams.searchKey != null){
           $scope.isLoading =    displayFactory.searchResult($stateParams.searchKey).then(
              function (response) {
                  if(response.data.entries != undefined && response.data.entries.length >0){
                   displayCtrl.displayList = response.data.entries;}
                  else{
                   displayCtrl.noDisplayList = "none";
                  }
              },function(error) {
                console.log('searchInfo - error',error);
              });
          }

    }


    displayCtrl.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };
   
    displayCtrl.toggleFolder = function() {
      displayCtrl.folderEnabled = !displayCtrl.folderEnabled;
      displayCtrl.showFolder = !displayCtrl.showFolder;
    };
    displayCtrl.toggleDocument = function() {
      displayCtrl.documentEnabled = !displayCtrl.documentEnabled;
      displayCtrl.showDocument = !displayCtrl.showDocument;
    };
     displayCtrl.sortDocument = function() {
      displayCtrl.sortEnabled = !displayCtrl.sortEnabled;
      displayCtrl.sortKey = 'content.properties.r_creation_date'; 
      $scope.reverse = !$scope.reverse; 
    };

    displayCtrl.openFolder = function(objectid) {
      $state.go('displayFolder', {objectid: objectid});
    };

    init();

}
}());