/**
 * @author Chris Swenson
 * @version 1.0.0
 */

var serverURL = "http://localhost:8080";

var WebApp = angular.module("WebApp", ['ngMaterial']).config(AppConfig).controller("AppController", AppController);

function AppController($scope, $interval){
  $scope.data = {
    selectedIndex: 0,
    resetTimerValue: 100,
    resetTimerMaxMS: 60000
  };

  $scope.requestSpotNumber = function(){
    //// Request Spot From Server

    //// If Server Responds With Spot #
    // $scope.data.selectedIndex = 1;
    // $scope.resetTimerTick();

    //// Else If Server Responds With Invalid License Plate
    $scope.data.selectedIndex = 2;
    $scope.resetTimerTick();
  };

  $scope.reset = function(){
    $scope.data.selectedIndex = 0;
  };

  $scope.getSpot = function(){
    $scope.data.selectedIndex = 3;
    $scope.data.resetTimerValue = 100;
  };

  $scope.resetTimerTick = function(){
    $scope.data.resetTimerValue = 100;

    var resetInterval = $interval(function(){
      if($scope.data.selectedIndex != 0 && $scope.data.resetTimerValue > 0){
          $scope.data.resetTimerValue--;
      }else{
        $scope.reset();
        $interval.cancel(resetInterval);
      }
    }, $scope.data.resetTimerMaxMS/100);
  };
}

function AppConfig($mdThemingProvider){
  $mdThemingProvider.theme('default')
    .backgroundPalette('blue-grey', {
      'default': '900'
    })
    .primaryPalette('blue-grey', {
    })
    .accentPalette('indigo', {
      'default': 'A700'
    }).dark();

  $mdThemingProvider.theme('input')
    .primaryPalette('blue-grey', {
      'default': '100'
    })
    .accentPalette('blue-grey', {
      'default': 'A700'
    }).dark();
}

// WebApp.controller("myController", function($scope, $http){
//   // $http.post(serverURL + "/license", {}).success(function(response){
//   //   $scope.myData = response;
//   // });
//   $scope.continue = function(){
//     $http.get(serverURL + "/").success(function(response){
//       $scope.myData = response;
//     });
//   };
// });
