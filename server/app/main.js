/**
 * @author Chris Swenson
 * @version 1.0.0
 */

var serverURL = "http://localhost:8080";

var WebApp = angular.module("WebApp", ['ngMaterial']);

WebApp.factory('socket', function ($rootScope) {
  var socket = io.connect(serverURL);
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});

WebApp.controller("AppController", function AppController($scope, $interval, $http, socket) {

  //server pushed down a notification that we are currently reading the plate
  socket.on('reading-plate', function (data) {
    console.log('reading-plate', data);
  });

  //server pushed down a read plate number
  socket.on('new-spot', function (data) {
    console.log('new-spot', data);
    //$scope.requestSpotNumber();
  });

  //server pushed down a failed read of license plate
  socket.on('failed-read', function (data) {
    console.log('failed-read', data);
  });

  $scope.data = {
    selectedIndex: 0,
    resetTimerValue: 100,
    resetTimerMaxMS: 60000
  };

  $scope.requestSpotNumber = function () {
    //// Request Spot From Server

    $http.post(serverURL + "/spot", {}).then(function (response) {
      $scope.httpData = response;
    });

    //// If Server Responds With Spot #
    // $scope.data.selectedIndex = 1;
    // $scope.resetTimerTick();

    //// Else If Server Responds With Invalid License Plate
    $scope.data.selectedIndex = 2;
    $scope.resetTimerTick();
  };

  $scope.sendPhoneNumber = function () {
    //// Send Phone Number To Server

    $http.post(serverURL + "/phone", { 'number': $scope.phone }).then(function (response) {
      $scope.httpData = response;
    });

    //// Responds With Spot #
    $scope.data.selectedIndex = 1;
    $scope.resetTimerTick();
  };

  $scope.reset = function () {
    $scope.phone = "";
    $scope.data.selectedIndex = 0;
  };

  $scope.getSpot = function () {
    $scope.data.selectedIndex = 3;
    $scope.data.resetTimerValue = 100;
  };

  $scope.resetTimerTick = function () {
    $scope.data.resetTimerValue = 100;

    var resetInterval = $interval(function () {
      if ($scope.data.selectedIndex != 0 && $scope.data.resetTimerValue > 0) {
        $scope.data.resetTimerValue--;
      } else {
        $scope.reset();
        $interval.cancel(resetInterval);
      }
    }, $scope.data.resetTimerMaxMS / 100);
  };

  $scope.phone = "";
  $scope.inputAdd = function (val) {
    $scope.phone += val;
    $scope.inputChange();
  }

  $scope.inputBackspace = function () {
    $scope.phone = $scope.phone.slice(0, -1);
    $scope.inputChange();
  }

  $scope.inputChange = function () {
    $scope.data.resetTimerValue = 100;
  };
});

WebApp.config(function AppConfig($mdThemingProvider) {
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
});
