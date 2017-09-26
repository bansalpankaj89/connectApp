(function () {
    'use strict';
    angular
        .module('myApp')
        .controller('addCardController',
                    ['$scope','$stateParams','$state','$mdBottomSheet','$mdToast','settings','displayFactory', addCardController]);

function addCardController ($scope,$stateParams,$state,$mdBottomSheet,$mdToast,settings,displayFactory) {

	  var cardCtrl = this;
    var ref;
    $scope.alert = '';
    $scope.showSummary =true;


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
          }
    }

    $scope.onSwipeLeft = function(ev) {
          $scope.showSummary = !$scope.showSummary;
    };


   cardCtrl.openFile = function(objId,fileSize) {

      if(fileSize <= 50000000){
          var acsUrl = settings.webApiBaseUrl+"/objects/"+objId+"/contents/content.json";

                if(acsUrl != null || acsUrl !='' ){
                      displayFactory.acsResult(acsUrl).then(
                          function (response) {
                             if(response.data.links != undefined && response.data.links.length >0){
                                   var finalUrl  =  response.data.links.filter(function(d){
                                        return d.rel == settings.enclosure;
                                    });
                            //     console.log('ACS url - ',finalUrl[0].href);
                                   var url=finalUrl[0].href;
                                   
                                   ref = cordova.InAppBrowser.open(url,"_blank","location=no,disallowoverscroll=no,toolbar=yes,closebuttoncaption=BACK,presentationstyle=pagesheet");
                                   ref.addEventListener('loaderror', function(event) { 
                                  //  alert('The format of the document you have selected is not supported');
                                       var scriptErrorMesssage = "alert('The format of the document you have selected is not supported');"
                                          ref.executeScript({ code: scriptErrorMesssage });
                                          ref.close();
                                          ref = undefined;
                                   });

                              }
                          },function(error) {
                            console.log('searchInfo - error',error);
                          });
                 }
        }
        else{
            $mdToast.show(
                        $mdToast.simple()
                          .content('View Restricted')
                          .position($scope.getToastPosition())
                          .hideDelay(3000)
                      );

        }         
    };



    cardCtrl.showListBottomSheet = function(propUrl) {
      settings.propUrl = propUrl;
        $scope.alert = '';
        $mdBottomSheet.show({
          templateUrl: 'app/properties.html',
          controller: 'propertiesController as prtCtrl'
        }).then(function(clickedItem) {
          $scope.alert = clickedItem.name + ' clicked!';
        });
    };

     init();
        
};
}());