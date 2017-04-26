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
    })
    .state('artdetail', {
      url: '/artdetail',
      templateUrl: 'tpl/artdetail.html',
      controller: 'ArtdetailController',
      controllerAs: 'artdetailCtrl'
    });
});

var goback = function () {
  return window.history.back();
};
// 艾灸店列表控制
aystore.controller('HomeController', function($rootScope, $scope, $http) {
  $http.get('data/strlist.json', {
      params: {
        "custId": "12323",
        "data": "strList"
      },
      responseType: "json"
    })
    .then(function(res) {
      console.log(res.data.data);
      $rootScope.strItems = res.data.data;
    }, function() {
      alert('error');
    });
});

// 文章页列表控制
aystore.controller('AycultureController', function($rootScope, $scope, $http) {
  $http.get('data/artlist.json', {
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
      $scope.isType1 = function (type) {
        return type==1? true : false;
      };
      $scope.isType2 = function (type) {
        return type==2? true : false;
      };
    }, function() {
      alert('error');
    });
});
// 文章详情页控制
aystore.controller('ArtdetailController', function($rootScope, $scope, $http) {
  $http.get('data/artdetail.json', {
      params: {
        "custId": "12323",
        "data": "artdetail"
      },
      responseType: "json"
    })
    .then(function(res) {
      // console.log(res);
      $rootScope.art = res.data.data;
      $scope.art = res.data.data;

    }, function() {
      alert('error');
    });

});

// 底部菜单状态控制
aystore.controller('BotmenuController', function($scope) {
  // 点击第一个按钮时的动作
  $scope.select1 = function () {
    $scope.path1 = "img/home-selected.jpg";
    $scope.path2 = "img/img/ay.jpg.jpg";
    $scope.path3 = "img/mine.jpg.jpg";
    $scope.txtClass1 = 1;
    $scope.txtClass2 = 0;
    $scope.txtClass3 = 0;
  };
  // 点击第二个按钮时的动作
  $scope.select2 = function () {
    $scope.path1 = "img/home.jpg";
    $scope.path2 = "img/ay-selected.jpg";
    $scope.path3 = "img/mine.jpg.jpg";
    $scope.txtClass1 = 0;
    $scope.txtClass2 = 1;
    $scope.txtClass3 = 0;
  };
  // 点击第三个按钮时的动作
  $scope.select3 = function () {
    $scope.path1 = "img/home.jpg";
    $scope.path2 = "img/ay.jpg";
    $scope.path3 = "img/mine-selected.jpg";
    $scope.txtClass1 = 0;
    $scope.txtClass2 = 0;
    $scope.txtClass3 = 1;
  };
});

// 我的页控制器
aystore.controller('MineController', function($rootScope, $scope, $http) {
  $http.get('data/mine.json', {
      params: {
        "custId": "12323",
        "data": "mine"
      },
      responseType: "json"
    })
    .then(function(res) {
      $rootScope.mine = res.data.data;
      $scope.mine = res.data.data;
    }, function() {
      alert('error');
    });
});

// 消费记录
aystore.controller('RecordController', function($rootScope, $scope, $http) {

});
