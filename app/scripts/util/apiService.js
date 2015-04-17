angular.module('communityApp.apiService',[])
.factory('CommunityAPIService', function() {
  //var url = "http://192.168.43.180:8000";
  var url = "http://192.168.0.33:8000";
  var signinURL = url + "/users";
  var docListURL = url + "/read/";
  var postNoteURL = url + "/note";
  var noteDetailsURL = url + "/read/";
  var loginURL = url + "/users/session";
  var getSubCategoryURL = url + "/getSubCategory/";
  var updateNoteURL = url + "/note/";
  var searchNoteURL = url + "/notesearch/";
  var socialusersURL = url + "/socialusers";
  var commentPostURL = url + "/note/addcomment";
  var listCommentURL = url + "/note/listbysubject/";
  var listdocURL = url + "/listdoc/";
  var pushNotificationURL = url + "/notification";
  return {
    BASE_URL: url,
    signinURL: signinURL,
    docListURL: docListURL,
    postNoteURL: postNoteURL,
    noteDetailsURL: noteDetailsURL,
    loginURL: loginURL,
    getSubCategoryURL : getSubCategoryURL,
    updateNoteURL: updateNoteURL,
    searchNoteURL: searchNoteURL,
    socialusersURL: socialusersURL,
    commentPostURL: commentPostURL,
    listCommentURL:listCommentURL,
    listdocURL:listdocURL,
    pushNotificationURL: pushNotificationURL
  };
});