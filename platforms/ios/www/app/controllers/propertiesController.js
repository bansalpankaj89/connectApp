(function () {
    "use strict";
    angular
        .module("myApp")
        .controller("propertiesController",
                    ["$scope","$stateParams","$state","$mdToast","settings","propertiesFactory", propertiesController]);

    function propertiesController ($scope,$stateParams,$state,$mdToast,settings,propertiesFactory) {
         var prtCtrl = this;
         prtCtrl.propertyList='';

             function init() { 
			      if(settings.propUrl != null || settings.propUrl !=''){
			        propertiesFactory.getProperties(settings.propUrl).then(
			          function (response) {
			              if(response.data.properties != undefined ){
			               prtCtrl.propertyList = response.data.properties;
			           	  }
			              else{
			               prtCtrl.nopropertyList = "none";
			              }
			          },function(error) {
			            console.log('propertyInfo - error',error);
			          });
			      }
   			 }
     
 		 init();

 
    };
}());