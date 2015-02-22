'use strict';
angular.module('communityApp.subCategory', [])
.config(function($stateProvider) {
  $stateProvider
   .state('app.subCategoryRead', {
    url: '/subCategoryRead',
    views: {
      'menuContent': {
        controller: 'SubCategoryReadCtrl',
        templateUrl: 'scripts/pages/subCategory/subRead.tpl.html'
      }
    }
  })
   .state('app.postcomment', {
    url: '/postcomment',
    views: {
      'menuContent': {
        controller: 'PostCommentCtrl',
        templateUrl: 'scripts/pages/subCategory/comment.tpl.html'
      }
    }
  })
  .state('app.subCategory', {
    url: '/subCategory',
    views: {
      'menuContent': {
        controller: 'SubCategoryCtrl',
        templateUrl: 'scripts/pages/subCategory/subCategory.tpl.html'
      }
    }
  });
})


.controller('SubCategoryCtrl', function($scope,
  $http,
  usSpinnerService,
  $rootScope,
  $ionicPlatform,
  $ionicPopup,
  localStorageService,
  $resource,
  CommunityAPIService,
  $ionicPopover,
  $location) {


  $ionicPopover.fromTemplateUrl('scripts/pages/subCategory/popover.tpl.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });
  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };

  $scope.readDetail = function(note){
      localStorageService.set("note", note);
      $location.path('/subCategoryRead');
  };
  var subCategoryId = localStorageService.get("subCategoryId");
  console.log(subCategoryId);

  var url = CommunityAPIService.getSubCategoryURL + subCategoryId;
   $http({method: 'GET', url: url}).
     success(function(data, status, headers, config) {
      $scope.notes = data.reverse();
       console.log(data);
     }).
     error(function(data, status, headers, config) {
      console.log("fail");
});

})
.controller('PostCommentCtrl', function($scope,
  $http,
  usSpinnerService,
  $rootScope,
  $ionicPlatform,
  $ionicPopup,
  localStorageService,
  $location,
  $resource,
  CommunityAPIService) {
  var user = localStorageService.get("user");
  $scope.note = localStorageService.get("note");
  $scope.home= function() {
      $location.path('/');
  };

  $scope.postComment = function(movie_id) {
      $location.path('/app/postcomment');
   };
 

})
.controller('SubCategoryReadCtrl', function($scope,
  $http,
  usSpinnerService,
  $rootScope,
  $ionicPlatform,
  $ionicPopup,
  localStorageService,
  $location,
  $resource,
  CommunityAPIService) {
  var user = localStorageService.get("user");
  $scope.note = localStorageService.get("note");
  $scope.home= function() {
      $location.path('/');
  };

  $scope.postComment = function(movie_id) {
      $location.path('/app/postcomment');
   };
 

});

