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
  $firebaseAuth,
  $ionicSideMenuDelegate) {
  $ionicSideMenuDelegate.canDragContent(false);
  var ref = new Firebase("https://blistering-heat-2084.firebaseio.com/");

  $scope.changefacebook = function() {

    if($scope.facebooklogin == true){
          ref.authWithOAuthPopup("facebook", function(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
          } else {
            console.log("Authenticated successfully with payload:", authData);

    var url = CommunityAPIService.socialusersURL;
    var provideruser = {
        username:authData.facebook.displayName,
        fullname:authData.facebook.displayName,
        provider:authData.provider,
        providerid:authData.facebook.id,
        providerdetail:authData.facebook.cachedUserProfile
    }; 
    var user = JSON.stringify(provideruser);
    $http({method: 'POST', url: url, data:user, headers: {'Content-Type': 'application/json'},
        }).
      success(function(data, status, headers, config) {
        
         localStorageService.set("user", JSON.stringify(data));
         $location.path('/');
      }).
      error(function(data, status, headers, config) {
        console.log("fail");
        });
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
            var url = CommunityAPIService.socialusersURL;
    var provideruser = {
        username:authData.twitter.username,
        fullname:authData.twitter.displayName,
        provider:authData.provider,
        providerid:authData.twitter.id,
        providerdetail:authData.twitter.cachedUserProfile
    }; 
    var user = JSON.stringify(provideruser);
    $http({method: 'POST', url: url, data:user, headers: {'Content-Type': 'application/json'},
        }).
      success(function(data, status, headers, config) {
       localStorageService.set("user", JSON.stringify(data));
         $location.path('/');
      }).
      error(function(data, status, headers, config) {
        console.log("fail");
        });
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
