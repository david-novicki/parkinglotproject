/**
 * @author Chris Swenson
 * @version 1.0.0
 */

var serverURL = "http://localhost:8080";

var myApp = angular.module("myApp", []);
myApp.controller("myController", function($scope, $http){
  $http.post(serverURL + "/license", {}).success(function(response){
    $scope.myData = response;
    console.log(response);
  });
});
