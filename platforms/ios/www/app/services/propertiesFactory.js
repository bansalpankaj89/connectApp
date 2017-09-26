(function () {
    "use strict";
    angular
        .module("myApp")
        .factory('propertiesFactory',
         ['$http', 'settings','$q', function ($http, settings, $q) {

            var urlBase = settings.webApiBaseUrl + "/contents/content.json";

        	var propertiesFactory ={};

            propertiesFactory.getProperties = function (relUrl) {
          //  console.log("propertiesFactory - getProperties - url",JSON.stringify(relUrl));
                return $q(function(resolve, reject) {
                     $http({ method: 'GET', 
                            url: relUrl, 
                            headers: settings.authKey
                        }).then(function(response){
                          //  console.log("displayFactory -- response",JSON.stringify(response));
                            return resolve(response);
                        }, function (error) {
                            console.log("propertiesFactory -- error",JSON.stringify(error));
                            return reject(error);
                        });
                });
            };            

            return propertiesFactory;
        }]);
}());