'use strict';
var aystore = angular.module('aystore', ['ui.router']);

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
    .then(function(res) {
      // console.log(res);
      $rootScope.artItems = res.data.data;
      $scope.artItems = res.data.data;
      $rootScope.type = res.data.data.artItems;
      var type = $rootScope.artItems[0].type;
      // console.log(type);
      console.log($scope.artItems[0].thumbnail);
    }, function() {
      alert('error');
    });
});
