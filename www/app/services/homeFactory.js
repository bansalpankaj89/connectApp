(function () {
    "use strict";
    angular
        .module("myApp")
        .factory('homeFactory',
        ['$http', '$q', function ($http, $q) {

          var urlBase = "http://connect-app.azurewebsites.net/api/connect/";

        	var homeFactory ={};

            homeFactory.createUser= function (user) {

                return $q(function(resolve, reject) {
                     $http({ method: 'POST',
                            url: urlBase + "user",
                            headers: {'Content-Type': 'application/json'},
                            data: user
                        }).then(function(response){
                            console.log("createUser",response);
                            return resolve(response);
                        }, function (error) {
                            console.log("createUser -- error",JSON.stringify(error));
                            return reject('error');
                        });
                });

            };


            homeFactory.getUsers= function (user) {

                return $q(function(resolve, reject) {
                     $http({ method: 'GET',
                            url: urlBase + "users",
                            headers: {'Content-Type': 'application/json'}
                        }).then(function(response){
                            console.log("getUsers",response);
                            return resolve(response);
                        }, function (error) {
                            console.log("getUsers -- error",JSON.stringify(error));
                            return reject('error');
                        });
                });

            };


            homeFactory.addFriend= function (user1,user2) {

            var input =     { "friends" : [user1,user2] }

                return $q(function(resolve, reject) {
                     $http({ method: 'PUT',
                            url: urlBase + "addfriend",
                            headers: {'Content-Type': 'application/json'},
                            data: input
                        }).then(function(response){
                            console.log("addFriend",response);
                            return resolve(response);
                        }, function (error) {
                            console.log("addFriend -- error",JSON.stringify(error));
                            return reject('error');
                        });
                });

            };


            homeFactory.retrieveFriend= function (user) {

            var input =     { "email" : user}

                return $q(function(resolve, reject) {
                     $http({ method: 'PUT',
                            url: urlBase + "user",
                            headers: {'Content-Type': 'application/json'},
                            data: input
                        }).then(function(response){
                            console.log("retrieveFriend",response);
                            return resolve(response);
                        }, function (error) {
                            console.log("retrieveFriend -- error",JSON.stringify(error));
                            return reject('error');
                        });
                });

            };

            homeFactory.commonFriend= function (user1,user2) {

            var input =     { "friends" : [user1,user2] }

                return $q(function(resolve, reject) {
                     $http({ method: 'PUT',
                            url: urlBase + "mutualfriend",
                            headers: {'Content-Type': 'application/json'},
                            data: input
                        }).then(function(response){
                            console.log("retrieveFriend",response);
                            return resolve(response);
                        }, function (error) {
                            console.log("retrieveFriend -- error",JSON.stringify(error));
                            return reject('error');
                        });
                });

            }; 

           homeFactory.subscribeUser= function (user1,user2) {

            var input =     {
                "requestor": user1,
                "target": user2
              }

                return $q(function(resolve, reject) {
                     $http({ method: 'PUT',
                            url: urlBase + "subscribe",
                            headers: {'Content-Type': 'application/json'},
                            data: input
                        }).then(function(response){
                            console.log("retrieveFriend",response);
                            return resolve(response);
                        }, function (error) {
                            console.log("retrieveFriend -- error",JSON.stringify(error));
                            return reject('error');
                        });
                });

            }; 

            homeFactory.blockUser= function (user1,user2) {

             var input =     {
                "requestor": user1,
                "target": user2
              }

                return $q(function(resolve, reject) {
                     $http({ method: 'PUT',
                            url: urlBase + "block",
                            headers: {'Content-Type': 'application/json'},
                            data: input
                        }).then(function(response){
                            console.log("retrieveFriend",response);
                            return resolve(response);
                        }, function (error) {
                            console.log("retrieveFriend -- error",JSON.stringify(error));
                            return reject('error');
                        });
                });

            }; 


            homeFactory.feed= function (user1,txt) {

             var input =    {
             "sender":  user1,
             "text": txt
           }

                return $q(function(resolve, reject) {
                     $http({ method: 'PUT',
                            url: urlBase + "recieveupdates",
                            headers: {'Content-Type': 'application/json'},
                            data: input
                        }).then(function(response){
                            console.log("retrieveFriend",response);
                            return resolve(response);
                        }, function (error) {
                            console.log("retrieveFriend -- error",JSON.stringify(error));
                            return reject('error');
                        });
                });

            };            

            return homeFactory;
        }]);
}());



