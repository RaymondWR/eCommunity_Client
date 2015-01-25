'use strict';
angular.module('communityApp.subCategory', [])
.config(function($stateProvider) {
  $stateProvider.state('app.subCategory', {
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
  $ionicPopover) {


  $ionicPopover.fromTemplateUrl('scripts/pages/subCategory/popover.tpl.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });


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

});
