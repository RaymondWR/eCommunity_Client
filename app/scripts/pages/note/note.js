'use strict';
angular.module('communityApp.note', [])
.config(function($stateProvider) {
  $stateProvider.state('app.note', {
    url: '/note',
    views: {
      'menuContent': {
        controller: 'NoteCtrl',
        templateUrl: 'scripts/pages/note/note.tpl.html'
      }
    }
  });
})


.controller('NoteCtrl', function($scope,
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
   $scope.postNote= function() {

    $scope.note = {
        category:$scope.category,
        isPrivate: $scope.isPrivate,
        title:$scope.title,
        content:$scope.content,
        userId: user._id
    };
    var jdata = 'mydata='+JSON.stringify($scope.note);
    var url = CommunityAPIService.postNoteURL;
    $http({method: 'POST', url: url, data:jdata, headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    }).
      success(function(data, status, headers, config) {
         console.log(data);
         $location.path('/read');
      }).
      error(function(data, status, headers, config) {
        console.log("fail");
        });

   };


});
