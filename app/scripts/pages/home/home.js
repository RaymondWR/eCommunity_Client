'use strict';
angular.module('communityApp.home', [])
.config(function($stateProvider) {
  $stateProvider.state('app.home', {
    url: '/',
    views: {
      'menuContent': {
        controller: 'HomeCtrl',
        templateUrl: 'scripts/pages/home/home.tpl.html'
      }
    }
  });
})


.controller('HomeCtrl', function($scope,
  $http,
  usSpinnerService,
  $rootScope,
  $ionicPlatform,
  $ionicPopup,
  localStorageService,
  $resource,
  $location) {

  $scope.classlists = [
    { title: 'Science', id: 1 },
    { title: 'Software', id: 2 },
    { title: 'Business', id: 3 },
    { title: 'Architecture', id: 4 },
    { title: 'Electronics', id: 5 },
    { title: 'Mathmatics', id: 6 },
    { title: 'Medicine', id: 7 }
  ];

  $scope.subCategory = function(id){

      localStorageService.set("subCategoryId",id);
      $location.path("/subCategory");
  }

});
