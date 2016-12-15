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

// Page Enumeration
var Page = {
  WELCOME: 0,
  READING_PLATE: 1,
  SPOT: 2,
  FAILED: 3,
  PHONE: 4
};

// Timer Object Structure
var Timer = function(){
  this.isActive = false;
  this.default = 100;
  this.value = this.default;
  this.tickValue = -1;
  this.maxMS = 60000;
  this.tick = function(){
    if(this.isActive){
      this.value += this.tickValue;
    }
  }
  this.reset = function(){
    this.value = this.default;
  };
  this.setActive = function(bool){
    this.isActive = bool;
  }
  this.isFinished = function(){
    return (this.value <= 0);
  };
};

// Main AngularJS Controller
WebApp.controller("AppController", function AppController($scope, $interval, $http, socket) {

  //// Initialize Scope Data and Data Functions
  $scope.phoneModel = "";
  $scope.data = {
    currentPage: 0,
    spotNumber: "NaN",
    timer: new Timer()
  };
  $scope.setPage = function(page){
    $scope.data.currentPage = page;

    if(page != Page.WELCOME){
      $scope.data.timer.setActive(true);
    }else{
      $scope.data.timer.setActive(false);
    }
    $scope.data.timer.reset();
    $scope.phoneModel = "";
  };

  //// Initialize Timer Ticker
  $interval(function(){
    if( !$scope.data.timer.isFinished() ){
      $scope.data.timer.tick();
    }else{
      $scope.data.timer.reset();
      $scope.onTimerFinished();
    }
  }, $scope.data.timer.maxMS / 100);

  //// Timer Events
  $scope.onTimerFinished = function(){
    $scope.setPage(Page.WELCOME);
  };

  //// Socket.io Server Pushed Events
  // Server pushed down a notification that we are currently reading the plate
  socket.on('reading-plate', function (data) {
    console.log('reading-plate', data);
    $scope.setPage(Page.READING_PLATE);
  });

  // Server pushed down a read plate number
  socket.on('new-spot', function (data) {
    console.log('new-spot', data);
    $scope.data.spotNumber = data.message;
    $scope.setPage(Page.SPOT);
    //$scope.requestSpotNumber();
  });

  // Server pushed down a failed read of license plate
  socket.on('failed-read', function (data) {
    console.log('failed-read', data);
    $scope.setPage(Page.FAILED);
  });

  //// Web Client Button Events
  $scope.onWelcomePressed = function(){
    $scope.setPage(Page.READING_PLATE);
  };

  $scope.onReadingPlateCancel = function(){
    $scope.onTimerFinished();
  };

  $scope.onSpotOkPressed = function(){
    $scope.onTimerFinished();
  };

  $scope.onFailedOkPressed = function(){
    $scope.onTimerFinished();
  };

  $scope.onFailedGetSpotPressed = function(){
    $scope.setPage(Page.PHONE);
  };

  $scope.onPhoneOkPressed = function(){
    $http.post(serverURL + "/phone", {'number': $scope.phoneModel}).then(function (response) {
      $scope.httpData = response;
    });

    // Server Will Emit "new-spot"
  };

  $scope.onPhoneCancelPressed = function(){
    $scope.onTimerFinished();
  };

  $scope.onPhoneInputChange = function(){
    $scope.data.timer.reset();
  };

  $scope.onPhoneInputAdd = function(val){
    $scope.phoneModel += val;
    $scope.onPhoneInputChange();
  };

  $scope.onPhoneInputBackspace = function(){
    $scope.phoneModel = $scope.phoneModel.slice(0, -1);
    $scope.onPhoneInputChange();
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
