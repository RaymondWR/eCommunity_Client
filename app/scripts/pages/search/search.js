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
  })
  .state('app.result', {
    url: '/result',
    views: {
      'menuContent': {
        controller: 'ResultCtrl',
        templateUrl: 'scripts/pages/search/result.tpl.html'
      }
    }
  })
  .state('app.readresult', {
    url: '/readresult',
    views: {
      'menuContent': {
        controller: 'ReadResultCtrl',
        templateUrl: 'scripts/pages/search/noteread.tpl.html'
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
  $resource,
  $location,
  CommunityAPIService) {

  $scope.search = function(title) {
      localStorageService.set("title", title);
      $location.path('/result');
  };
})

.controller('ResultCtrl', function($scope,
  $http,
  usSpinnerService,
  $rootScope,
  $ionicPlatform,
  $ionicPopup,
  localStorageService,
  $resource,
  $location,
  CommunityAPIService) {
  var title = localStorageService.get("title", title);

  var url = CommunityAPIService.searchNoteURL + title;
      $http({method: 'GET', url: url}).
      success(function(data, status, headers, config) {
      $scope.notes = data.reverse();

     }).
     error(function(data, status, headers, config) {
      console.log("fail");
  });

     $scope.readDetail = function(note){
      localStorageService.set("note", note);
      $location.path('/readresult');
  };

})

.controller('ReadResultCtrl', function($scope,
  $http,
  usSpinnerService,
  $rootScope,
  $ionicPlatform,
  $ionicPopup,
  localStorageService,
  $resource,
  CommunityAPIService) {
  $scope.note = localStorageService.get("note");

});
