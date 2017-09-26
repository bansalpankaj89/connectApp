(function () {
    "use strict";
    angular
        .module("myApp")
        .controller("homeController",
                    ["$scope","userlist","homeFactory",'$state','$mdToast', homeController]);

function homeController ($scope ,userlist,homeFactory, $state,$mdToast) {
      var homeCtrl = this;
      homeCtrl.newuser = {};
      homeCtrl.userList = userlist.data;
      homeCtrl.user1 = "";
      homeCtrl.user1 = "";
      homeCtrl.retrieveUser = ""; 
      homeCtrl.friendList = [];   
      homeCtrl.friendCount = 0;  
      homeCtrl.commonUser1  = "";
      homeCtrl.commonUser2  = "";
      homeCtrl.commonList = [];   
      homeCtrl.commonCount = 0;  

      homeCtrl.subscribeuser1 = "";
      homeCtrl.subscribeuser2 = "";
      homeCtrl.blockuser1 = "";
      homeCtrl.blockuser2 = "";
      homeCtrl.feeduser = "";
      homeCtrl.feedtext = "";
      homeCtrl.feedList = [];   
      homeCtrl.feedCount = 0; 

      

      function init() {

          homeCtrl.getUsers = function(){
                homeFactory.getUsers()
                    .then(function (result) {
                      console.log('result createUser',result);
                      homeCtrl.userList = result.data;
                    }, function (error) {
                       console.log('error createUser',error);
                            $mdToast.show(
                                  $mdToast.simple()
                                    .textContent("Error while Retrieving users")
                                    .position('top right')
                                    .hideDelay(3000)
                            );
                });
          };      


      }

      init();


        homeCtrl.createUser = function () {

          if(homeCtrl.newuser == undefined || homeCtrl.newuser.name == undefined || homeCtrl.newuser.email == undefined){
                    $mdToast.show(
                          $mdToast.simple()
                            .textContent("Name/Email can't be empty")
                            .position('top right')
                            .hideDelay(3000)
                     );
          }else{
          console.log(homeCtrl.newuser);

              homeFactory.createUser(homeCtrl.newuser)
                .then(function (result) {
                  console.log('result createUser',result);
                  homeCtrl.getUsers();
                    $mdToast.show(
                          $mdToast.simple()
                            .textContent("Created successfully")
                            .position('top right')
                            .hideDelay(3000)
                    );
                }, function (error) {
                   console.log('error createUser',error);
                        $mdToast.show(
                              $mdToast.simple()
                                .textContent("Not able to create user")
                                .position('top right')
                                .hideDelay(3000)
                        );
                });
          }      
        };



        homeCtrl.addFriend = function () {

          console.log(homeCtrl.user1,homeCtrl.user2);

          if(homeCtrl.user1 == "" || homeCtrl.user2 == "" || (homeCtrl.user1 == homeCtrl.user2)){
                    $mdToast.show(
                          $mdToast.simple()
                            .textContent("Email can't be same")
                            .position('top right')
                            .hideDelay(3000)
                     );
          }else{
              homeFactory.addFriend(homeCtrl.user1,homeCtrl.user2)
                .then(function (result1) {
                  console.log('result1 addFriend',result1);
                  homeCtrl.getUsers();
                  var msg = "";

                  if(result1.data.success === false){
                      msg = result1.data.detail;
                  }else{
                      msg = "Congrats You are now friends";
                  }
                    $mdToast.show(
                          $mdToast.simple()
                            .textContent(msg)
                            .position('top right')
                            .hideDelay(3000)
                    );
                }, function (error) {
                   console.log('error addFriend',error);
                        $mdToast.show(
                              $mdToast.simple()
                                .textContent(error.data)
                                .position('top right')
                                .hideDelay(3000)
                        );
                });

            }    
        };
        


        homeCtrl.retrieveFriend = function () {

          console.log(homeCtrl.retrieveUser);
          homeCtrl.friendList = [];   
          homeCtrl.friendCount = 0;

          if(homeCtrl.retrieveUser == ""){
                    $mdToast.show(
                          $mdToast.simple()
                            .textContent("Email can't be same")
                            .position('top right')
                            .hideDelay(3000)
                     );
          }else{
              homeFactory.retrieveFriend(homeCtrl.retrieveUser)
                .then(function (result1) {
                  console.log('result1 retrieveFriend',result1);
                  
                  homeCtrl.friendList = result1.data.friends;
                  homeCtrl.friendCount = result1.data.count;
                  if(result1.data.count == 0){
                      $mdToast.show(
                              $mdToast.simple()
                                .textContent("No Friends")
                                .position('top right')
                                .hideDelay(3000)
                        );

                  }

                }, function (error) {
                   console.log('error addFriend',error);
                        $mdToast.show(
                              $mdToast.simple()
                                .textContent(error.data)
                                .position('top right')
                                .hideDelay(3000)
                        );
                });

            }    
        };


      homeCtrl.commonFriend = function () {

          homeCtrl.commonList = [];   
          homeCtrl.commonCount = 0;

          if(homeCtrl.commonUser1 == "" || homeCtrl.commonUser2 == ""){
                    $mdToast.show(
                          $mdToast.simple()
                            .textContent("Email can't be same")
                            .position('top right')
                            .hideDelay(3000)
                     );
          }else{
              homeFactory.commonFriend(homeCtrl.commonUser1,homeCtrl.commonUser2)
                .then(function (result1) {
                  console.log('result1 retrieveFriend',result1);
                  
                  homeCtrl.commonList = result1.data.friends;
                  homeCtrl.commonCount = result1.data.count;
                  if(result1.data.count == 0){
                      $mdToast.show(
                              $mdToast.simple()
                                .textContent("No Mutual Friends")
                                .position('top right')
                                .hideDelay(3000)
                        );

                  }

                }, function (error) {
                   console.log('error addFriend',error);
                        $mdToast.show(
                              $mdToast.simple()
                                .textContent(error.data)
                                .position('top right')
                                .hideDelay(3000)
                        );
                });

            }    
        };


        homeCtrl.subscribeUser = function () {

          console.log(homeCtrl.subscribeuser2,homeCtrl.subscribeuser2);

          if(homeCtrl.subscribeuser1 == "" || homeCtrl.subscribeuser2 == "" || (homeCtrl.subscribeuser1 == homeCtrl.subscribeuser2)){
                    $mdToast.show(
                          $mdToast.simple()
                            .textContent("Email can't be same")
                            .position('top right')
                            .hideDelay(3000)
                     );
          }else{
              homeFactory.subscribeUser(homeCtrl.subscribeuser1,homeCtrl.subscribeuser2)
                .then(function (result1) {
                  console.log('result1 subscribeUser',result1);
                  var msg = "";

                  if(result1.data.success === false){
                      msg = result1.data.detail;
                  }else{
                      msg = "subscribed Successfully";
                  }
                    $mdToast.show(
                          $mdToast.simple()
                            .textContent(msg)
                            .position('top right')
                            .hideDelay(3000)
                    );
                }, function (error) {
                   console.log('error addFriend',error);
                        $mdToast.show(
                              $mdToast.simple()
                                .textContent(error.data)
                                .position('top right')
                                .hideDelay(3000)
                        );
                });

            }    
        };


        homeCtrl.blockUser = function () {

          console.log(homeCtrl.blockuser1,homeCtrl.blockuser2);

          if(homeCtrl.blockuser1 == "" || homeCtrl.blockuser2 == "" || (homeCtrl.blockuser1 == homeCtrl.blockuser2)){
                    $mdToast.show(
                          $mdToast.simple()
                            .textContent("Email can't be empty/same")
                            .position('top right')
                            .hideDelay(3000)
                     );
          }else{
              homeFactory.blockUser(homeCtrl.blockuser1,homeCtrl.blockuser2)
                .then(function (result1) {
                  console.log('result1 blockUser',result1);
                  var msg = "";

                  if(result1.data.success === false){
                      msg = result1.data.detail;
                  }else{
                      msg = "Blocked Successfully";
                  }
                    $mdToast.show(
                          $mdToast.simple()
                            .textContent(msg)
                            .position('top right')
                            .hideDelay(3000)
                    );
                }, function (error) {
                   console.log('error addFriend',error);
                        $mdToast.show(
                              $mdToast.simple()
                                .textContent(error.data)
                                .position('top right')
                                .hideDelay(3000)
                        );
                });

            }    
        };


        homeCtrl.feed = function () {

           homeCtrl.feedList = [];   
           homeCtrl.feedCount = 0; 

          console.log(homeCtrl.feeduser,homeCtrl.feedtext);

          if(homeCtrl.feeduser == "" || homeCtrl.feedtext == ""){
                    $mdToast.show(
                          $mdToast.simple()
                            .textContent("Email/Feed can't be same")
                            .position('top right')
                            .hideDelay(3000)
                     );
          }else{
              homeFactory.feed(homeCtrl.feeduser,homeCtrl.feedtext)
                .then(function (result1) {
                  console.log('result1 feed',result1);
                  
                  homeCtrl.feedList = result1.data.recipients;
                  homeCtrl.feedCount = result1.data.recipients.length;
                  if(homeCtrl.feedCount == 0){
                      $mdToast.show(
                              $mdToast.simple()
                                .textContent("No one can see Feed")
                                .position('top right')
                                .hideDelay(3000)
                        );

                  }

                }, function (error) {
                   console.log('error addFriend',error);
                        $mdToast.show(
                              $mdToast.simple()
                                .textContent(error.data)
                                .position('top right')
                                .hideDelay(3000)
                        );
                });

            }       
        };


  



};
}());