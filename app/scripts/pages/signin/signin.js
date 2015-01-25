'use strict';
angular.module('communityApp.signin', [])
.config(function($stateProvider) {
  $stateProvider.state('app.signin', {
    url: '/signin',
    views: {
      'menuContent': {
        controller: 'SigninCtrl',
        templateUrl: 'scripts/pages/signin/signin.tpl.html'
      }
    }
  });
})

.controller('SigninCtrl', function($scope,
  $http,
  usSpinnerService,
  $rootScope,
  $ionicPlatform,
  $ionicPopup,
  localStorageService,
  $location,
  $resource,
  CommunityAPIService) {
  var BASE_URL = CommunityAPIService.BASE_URL;

   $scope.signup = function() {
    if($scope.password == $scope.password2){
      $scope.user = {
        username:$scope.username,
        fullname:$scope.fullname,
        password:$scope.password,
        email:$scope.email
    };
    var user = 'user='+JSON.stringify( $scope.user);

    var url = CommunityAPIService.signinURL;
    $http({method: 'POST', url: url, data:user, headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    }).
      success(function(data, status, headers, config) {

         localStorageService.set("user", data);
         $location.path('/');
      }).
      error(function(data, status, headers, config) {
        console.log("fail");
        });

    }

    }
    $scope.login= function() {
     $location.path('/app/login');
  }


});
