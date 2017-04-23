'use strict';
var aystore = angular.module('aystore', ['ui.router']);
// aystore.config(['$routeProvider', function ($routeProvider) {
//   $routeProvider
//   .when('/', {
//     templateUrl: 'tpl/home.html',
//     controller: 'HomeController'
//   })
//   .when('/home', {
//     templateUrl: 'tpl/home.html',
//     controller: 'HomeController'
//   })
//   .when('/ayculture', {
//     templateUrl: 'tpl/ayculture.html',
//     controller: 'AycultureController'
//   })
//   .when('/mine', {
//     templateUrl: 'tpl/mine.html',
//     controller: 'MineController'
//   });
// }]);
aystore.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when("", "/home");
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'tpl/home.html',
      controller: 'HomeController',
      controllerAs: 'homeCtrl'
    })
    .state('ayculture', {
      url: '/ayculture',
      templateUrl: 'tpl/ayculture.html',
      controller: 'AycultureController',
      controllerAs: 'ayCtrl'
    })
    .state('mine', {
      url: '/mine',
      templateUrl: 'tpl/mine.html',
      controller: 'MineController',
      controllerAs: 'mineCtrl'
    });
});

// 艾灸店列表控制
aystore.controller('HomeController', function($rootScope, $scope, $http) {
  $http.get('data/str-data.json', {
      params: {
        "custId": "12323",
        "data": "strData"
      },
      responseType: "json"
    })
    .then(function(data) {
      console.log(data.data.data);
      $rootScope.strItems = data.data.data;
    }, function() {
      alert('error');
    });
});
// 文章页列表控制
aystore.controller('AycultureController', function($rootScope, $scope, $http) {
  $http.get('data/art-data.json', {
      params: {
        "custId": "12323",
        "data": "artData"
      },
      responseType: "json"
    })
    .then(function(data) {
      console.log(data);
      $rootScope.artItems = data.data.data;
    }, function() {
      alert('error');
    });
});
