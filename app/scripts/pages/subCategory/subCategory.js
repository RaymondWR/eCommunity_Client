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
   .state('app.subCategoryDocRead', {
    url: '/subDocCategoryRead',
    views: {
      'menuContent': {
        controller: 'SubCategoryDocReadCtrl',
        templateUrl: 'scripts/pages/subCategory/subDocRead.tpl.html'
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
  .state('app.readDocDetail', {
    url: '/readDocDetail',
    views: {
      'menuContent': {
        controller: 'SubCategoryDocReadDetailCtrl',
        templateUrl: 'scripts/pages/subCategory/subDocReadDetail.tpl.html'
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
  $scope.title = localStorageService.get("subCategoryId");

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

  $scope.noteList= function(){
    $location.path("/subCategory");
  };

   $scope.documentationList= function(){
    $scope.closePopover();
    $location.path("/subDocCategoryRead");
  };

  $scope.home= function(){
    $location.path("/");
  };

  $scope.subscribe= function(){
  var subCategoryId = localStorageService.get("subCategoryId");
  console.log(subCategoryId);
  var user = localStorageService.get('user');
  console.log(user._id);

  $scope.notification = {
      category: subCategoryId,
      userId: user._id
  };

  var jdata = 'mydata='+JSON.stringify($scope.notification);
  var url = CommunityAPIService.pushNotificationURL;
  $http({method: 'POST', url: url, data:jdata, headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    }).
    success(function(data, status, headers, config) {
         console.log(data);
         $location.path('/read');
    }).
    error(function(data, status, headers, config) {
        console.log("fail");
    });
    //$location.path("/subCategory");
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

 $scope.postcomment = function() {
    var review = {
        noteId:$scope.note._id,
        rating: $scope.rating,
        comments:$scope.comment,
        userId: localStorageService.get("user")._id,
        username: localStorageService.get("user").username
  };

   var jdata = 'mydata='+JSON.stringify(review);
    var url = CommunityAPIService.commentPostURL;
    $http({method: 'POST', url: url, data:jdata, headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    }).
      success(function(data, status, headers, config) {
         console.log(data);
        $location.path('/subCategoryRead');

      }).
      error(function(data, status, headers, config) {
        console.log("fail");
        });
 }

})
.controller('SubCategoryDocReadCtrl', function($scope,
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


   $scope.noteList= function(){
    $scope.closePopover();
    $location.path("/subCategory");
  };

  $scope.documentationList= function(){
    $scope.closePopover();
  };
  var user = localStorageService.get("user");
  var subCategoryId = localStorageService.get("subCategoryId");
  var url = CommunityAPIService.listdocURL+subCategoryId;
  $http({method: 'GET', url: url}).
     success(function(data, status, headers, config) {
      $scope.notes = data.reverse();

     }).
     error(function(data, status, headers, config) {
      console.log("fail");
});

   $scope.readDetail = function(note){
      localStorageService.set("note", note);
      $location.path('/readDocDetail');
  };


})

.controller('SubCategoryDocReadDetailCtrl', function($scope,
  $http,
  usSpinnerService,
  $rootScope,
  $ionicPlatform,
  $ionicPopup,
  localStorageService,
  $location,
  $resource,
  $cordovaFileTransfer,
  $cordovaFileOpener2,
  $timeout,
  $cordovaProgress,
  $ionicLoading,
  CommunityAPIService) {

  $scope.home= function() {
      $location.path('/');
  };
  var user = localStorageService.get("user");
  $scope.postComment = function() {
      $location.path('/postcomment');
   };
  $scope.note = localStorageService.get("note");
  var url = CommunityAPIService.listCommentURL+$scope.note._id;
  $http({method: 'GET', url: url}).
     success(function(data, status, headers, config) {
      $scope.reviews = data.reverse();

     }).
     error(function(data, status, headers, config) {
      console.log("fail");
});
  console.log($rootScope.deviceInfo);

  $scope.readpdf = function(note){

        $ionicLoading.show({
            template: 'Loading...'
        });

     var url = note.url;
    if($rootScope.deviceInfo == "browser"){
        $ionicLoading.hide();
         window.location.href = url;
    }else{
    var filename = (new Date().getTime())+".pdf"
    var targetPath = '/sdcard/Download/' + filename;
    var trustHosts = true
    var options = {};
      $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
      .then(function(result) {

          $ionicLoading.hide();

          $cordovaFileOpener2.open(
            '/sdcard/Download/'+result.name,
            'application/pdf'
          ).then(function() {

          }, function(err) {
              // An error occurred. Show a message to the user
          });


      }, function(err) {
        // Error
      }, function (progress) {
        $timeout(function () {
          $scope.downloadProgress = (progress.loaded / progress.total) * 100;
        })
      });

    }


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

  $scope.postComment = function() {
      $location.path('/postcomment');
   };
  var url = CommunityAPIService.listCommentURL+$scope.note._id;
  $http({method: 'GET', url: url}).
     success(function(data, status, headers, config) {
      $scope.reviews = data.reverse();
     }).
     error(function(data, status, headers, config) {
      console.log("fail");
     });
});

