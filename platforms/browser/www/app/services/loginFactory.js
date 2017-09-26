(function () {
    "use strict";
    angular
        .module("myApp")
        .factory('loginFactory',
        ['$http', 'settings', '$q', function ($http, settings, $q) {

          var urlBase = settings.authApiBaseUrl + "/users/dmsadmin.json";

        	var loginFactory ={};
             loginFactory.isAuthenticated = false;
             settings.isAuthenticated = false;
             settings.authKey = '';

            loginFactory.checkAccess= function (user) {
             //   console.log("loginFactory -- checkAccess",JSON.stringify(user));
                return $q(function(resolve, reject) {
                     $http({ method: 'GET', 
                            url: urlBase, 
                            headers: {
                                'Authorization': 'Basic '+btoa(user.username.toLowerCase()+ ':' +user.password),
                                'Accept': 'application/json;odata=verbose',
                                'DOCUMENTUM-CUSTOM-UNAUTH-SCHEME': true
                            }
                        }).then(function(response){
             //               console.log("loginFactory -- response",JSON.stringify(response));
                            loginFactory.isAuthenticated = true;
                            settings.isAuthenticated = true;
                            settings.authKey = response.config.headers;
                            return resolve(response);
                        }, function (error) {
             //               console.log("loginFactory -- error",JSON.stringify(error));
                            loginFactory.isAuthenticated = false;
                            settings.isAuthenticated = false;
                            return reject(error);
                        });
                });

            };

            return loginFactory;
        }]);
}());






