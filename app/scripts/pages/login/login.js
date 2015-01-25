'use strict';
angular.module('communityApp.login', ['firebase'])
.config(function($stateProvider) {
  $stateProvider.state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        controller: 'LoginCtrl',
        templateUrl: 'scripts/pages/login/login.tpl.html'
      }
    }
  });
})


.controller('LoginCtrl', function($scope,
  $http,
  usSpinnerService,
  $rootScope,
  $ionicPlatform,
  $ionicPopup,
  $location,
  localStorageService,
  $resource,
  CommunityAPIService,
  $firebase,
  $firebaseAuth) {
  var ref = new Firebase("https://blistering-heat-2084.firebaseio.com/");

  $scope.changefacebook = function() {

    if($scope.facebooklogin == true){
          ref.authWithOAuthPopup("facebook", function(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
          } else {
            console.log("Authenticated successfully with payload:", authData);
          }
    });
    }

  };

  $scope.changetwitter = function() {
      if($scope.twitterlogin == true){
          ref.authWithOAuthPopup("twitter", function(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
          } else {
            console.log("Authenticated successfully with payload:", authData);
          }
    });
      }
  }

   $scope.login = function() {
      $scope.user = {
        email:$scope.email,
        password:$scope.password
     };
     var user = JSON.stringify($scope.user);
     var url = CommunityAPIService.loginURL;
    $http({method: 'POST', url: url, data:user, headers: {'Content-Type': 'application/json'},
      }).
      success(function(data, status, headers, config) {
         console.log(data);
        localStorageService.set("user", data);
         $location.path('/');
      }).
      error(function(data, status, headers, config) {
        console.log("fail");
        });
    }


});
