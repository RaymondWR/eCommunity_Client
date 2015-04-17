'use strict';
var communityApp = angular.module('communityApp', ['ionic',
  'ngResource',
  'angularSpinner',
  'LocalStorageModule',
  'ngCordova',
  'communityApp.home',
  'communityApp.signin',
  'communityApp.login',
  'communityApp.search',
  'communityApp.note',
  'communityApp.read',
  'communityApp.apiService',
  'communityApp.subCategory'
]);


communityApp.config(function($stateProvider, $locationProvider, $urlRouterProvider) {
  $stateProvider.state('app', {
    url: '',
    abstract: true,
    templateUrl: 'scripts/layout.tpl.html',
    controller: 'LayoutCtrl'
  });

  //No states are matched, use this as the fallback
  //$locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/login');

});

communityApp.run(function($ionicPlatform,
  $ionicPopup,
  localStorageService,
  $rootScope,
  $cordovaSplashscreen) {
  $ionicPlatform.ready(function() {
  var deviceInformation = ionic.Platform.platforms[0];
  $rootScope.deviceInfo = deviceInformation;
    if (window.Connection) {
      if (navigator.connection.type == Connection.NONE) {
        $ionicPopup.confirm({
          title: "Internet Disconnected",
          content: "The internet is disconnected on your device."
        }).then(function(result) {
          if (result) {
            ionic.Platform.exitApp();
          }
        });
      } else {
      }
    }


    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

});

communityApp.controller('CommunityCtrl', function($scope) {

});

communityApp.controller('LayoutCtrl', function($scope,$location, $state,localStorageService) {
    $scope.logout = function(){
        localStorageService.clearAll();
        $location.path('/login');
    }

});