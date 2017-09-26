(function () {
    "use strict";
    angular
        .module("myApp")
        .controller("searchController",
                    ["$scope","$stateParams",'$state','settings', searchController]);

    function searchController ($scope,$stateParams,$state,settings ) {
      var searchCtrl = this;
      searchCtrl.advancemode =false;
      searchCtrl.search ='';
      function init() {

      }

      init();

      $scope.onChange = function(cbState) {
          $state.go('advSearch');

      };

      $scope.searchDisply =function(searchStr){
          $state.go('display', {searchKey: '/search.json?q='+ searchStr + settings.searchInline,textKey: searchStr});
      };
 
    };
}());