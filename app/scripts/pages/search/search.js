'use strict';
angular.module('communityApp.search', [])
.config(function($stateProvider) {
  $stateProvider.state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        controller: 'SearchCtrl',
        templateUrl: 'scripts/pages/search/search.tpl.html'
      }
    }
  });
})


.controller('SearchCtrl', function($scope,
  $http,
  usSpinnerService,
  $rootScope,
  $ionicPlatform,
  $ionicPopup,
  localStorageService,
  $resource) {


});
