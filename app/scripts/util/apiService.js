angular.module('communityApp.apiService',[])
.factory('CommunityAPIService', function() {
  var url = "http://localhost:8080";
  var signinURL = url + "/users";
  var docListURL = url + "/read/";
  var postNoteURL = url + "/note";
  var noteDetailsURL = url + "/read/";
  var loginURL = url + "/users/session";
  var getSubCategoryURL = url + "/getSubCategory/"
  return {
    BASE_URL: url,
    signinURL: signinURL,
    docListURL: docListURL,
    postNoteURL: postNoteURL,
    noteDetailsURL: noteDetailsURL,
    loginURL: loginURL,
    getSubCategoryURL : getSubCategoryURL
  };
});