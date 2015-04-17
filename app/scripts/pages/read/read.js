'use strict';
angular.module('communityApp.read', [])
.config(function($stateProvider) {
  $stateProvider
  .state('app.read', {
    url: '/read',
    views: {
      'menuContent': {
        controller: 'ReadCtrl',
        templateUrl: 'scripts/pages/read/read.tpl.html'
      }
    }
  })
  .state('app.notedetail', {
    url: '/notedetail',
    views: {
      'menuContent': {
        controller: 'NoteDetailCtrl',
        templateUrl: 'scripts/pages/read/notedetail.tpl.html'
      }
    }
  })
  .state('app.noteupdate', {
    url: '/noteupdate',
    views: {
      'menuContent': {
        controller: 'NoteUpdateCtrl',
        templateUrl: 'scripts/pages/read/noteupdate.tpl.html'
      }
    }
  });
})


.controller('ReadCtrl', function($scope,
  $http,
  usSpinnerService,
  $rootScope,
  $ionicPlatform,
  $ionicPopup,
  localStorageService,
  $location,
  $resource,
  CommunityAPIService,
  $ionicPopover) {

  var user = localStorageService.get("user");
 // $scope.isDisabled = true;
  var url = CommunityAPIService.docListURL + user._id;
   $http({method: 'GET', url: url}).
     success(function(data, status, headers, config) {
      $scope.notes = data.reverse();
       console.log(data);
     }).
     error(function(data, status, headers, config) {
      console.log("fail");
      });

  $scope.readDetail = function(note){
      localStorageService.set("note", note);
      $location.path('/notedetail');
  };

})
.controller('NoteDetailCtrl', function($scope,
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

  $scope.delete = function(){
    var url = CommunityAPIService.noteDetailsURL + $scope.note._id;
    $http({method: 'DELETE', url: url, headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    }).
      success(function(data, status, headers, config) {
         console.log(data);
         localStorageService.remove("note")
         $location.path('/read');
      }).
      error(function(data, status, headers, config) {
        console.log("fail");
        });
  };

  $scope.update = function(note){
    console.log(note);
    localStorageService.set("note", note);
    $location.path('/noteupdate');
  }
})
.controller('NoteUpdateCtrl', function($scope,
  $http,
  usSpinnerService,
  $rootScope,
  $ionicPlatform,
  $ionicPopup,
  localStorageService,
  $location,
  $resource,
  CommunityAPIService) {
  $scope.note = localStorageService.get("note");
  $scope.postNote= function() {

    var updateNote = {
        category:$scope.note.category,
        isPrivate: $scope.note.isPrivate,
        title:$scope.note.title,
        content:$scope.note.content
    };
    var jdata = 'mydata='+JSON.stringify(updateNote);
    var url = CommunityAPIService.updateNoteURL + $scope.note._id;
    $http({method: 'PUT', url: url, data:jdata, headers: {'Content-Type': 'application/x-www-form-urlencoded'},
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
