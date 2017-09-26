(function () {
    "use strict";
    angular
        .module('myApp')
        .factory('displayFactory',
        ['$http', 'settings','$q', function ($http, settings, $q) {

            var urlBase = settings.authApiBaseUrl;
        	var displayFactory ={};

            displayFactory.searchResult = function (search) {
               // console.log("displayFactory - searchResult - url",JSON.stringify(urlBase+search));
                return $q(function(resolve, reject) {
                     $http({ method: 'GET', 
                            url: urlBase+search, 
                            headers: settings.authKey
                        }).then(function(response){
                         //   console.log("displayFactory -- searchResult -- response",JSON.stringify(response));
                            return resolve(response);
                        }, function (error) {
                            console.log("displayFactory -- searchResult -- error",JSON.stringify(error));
                            return reject(error);
                        });
                });
            };

            displayFactory.propResult = function (relUrl) {
             //   console.log("displayFactory - propResult - url",JSON.stringify(relUrl));
                return $q(function(resolve, reject) {
                     $http({ method: 'GET', 
                            url: relUrl, 
                            headers: settings.authKey
                        }).then(function(response){
                          //  console.log("displayFactory -- response",JSON.stringify(response));
                            return resolve(response);
                        }, function (error) {
                            console.log("displayFactory -- propResult -- error",JSON.stringify(error));
                            return reject(error);
                        });
                });
            };


            displayFactory.acsResult = function (acsUrl) {
             //   console.log("displayFactory - acsResult - url",JSON.stringify(acsUrl));
                return $q(function(resolve, reject) {
                     $http({ method: 'GET', 
                            url: acsUrl, 
                            headers: settings.authKey
                        }).then(function(response){
                          //  console.log("displayFactory -- response",JSON.stringify(response));
                            return resolve(response);
                        }, function (error) {
                            console.log("displayFactory -- acsResult -- error",JSON.stringify(error));
                            return reject(error);
                        });
                });
            };


            displayFactory.openFolder = function (folUrl) {
             // console.log("displayFactory - openFolder - url",JSON.stringify(folUrl));
                return $q(function(resolve, reject) {
                     $http({ method: 'GET', 
                            url: folUrl, 
                            headers: settings.authKey
                        }).then(function(response){
                        //    console.log("displayFactory -- response",JSON.stringify(response));
                            return resolve(response);
                        }, function (error) {
                            console.log("displayFactory -- openFolder -- error",JSON.stringify(error));
                            return reject(error);
                        });
                });
            };

            return displayFactory;
        }]);
}());