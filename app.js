'use strict';
var aystore = angular.module('aystore', ['ui.router']);

aystore.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when("", "/main");
  $stateProvider
    .state('main', {
      url: '/main',
      templateUrl: "tpl/main.html",
      views: {
        '': {
          templateUrl: "tpl/main.html"
        },
        'content@main': {
           templateUrl: "tpl/home.html"
        },
        'botmenu@main': {
           templateUrl: "tpl/botmenu.html"
        },
      }
    })

    .state('main.home', {// 商城页视图
      url: '/home',
      views: {
        'content@main': {
           templateUrl: "tpl/home.html"
        }
      }
    })
    .state('main.ayculture', {// 文章页视图
      url: '/ayculture',
      views: {
        'content@main': {
           templateUrl: "tpl/ayculture.html"
        }
      }
    })
    .state('main.mine', {// 我的页视图
      url: '/mine',
      views: {
        'content@main': {
           templateUrl: "tpl/mine.html"
        }
      }
    })

    .state('detail', {// 一些无底部菜单的页面
      url: '/detail',
      templateUrl: "tpl/detail.html"
    })
    .state('detail.strdetail', {// 商城详情页视图
      url: '/strdetail',
      templateUrl: "tpl/strdetail.html"
    })
    .state('detail.pay', {// 支付页视图
      url: '/pay',
      templateUrl: "tpl/pay.html"
    })
    .state('detail.success', {// 支付成功视图
      url: '/success',
      templateUrl: "tpl/pay-successful.html"
    })
    .state('detail.fail', {// 支付失败视图
      url: '/fail',
      templateUrl: "tpl/fail.html"
    })

    .state('main.artdetail', {// 文章详情页视图，含底部菜单
      url: '/artdetail',
      views: {
        'content@main': {
           templateUrl: "tpl/artdetail.html"
        }
      }
    })

    .state('record', {// 消费记录页视图
      url: '/record',
      templateUrl: "tpl/record.html"
    })
    .state('collection', {// 收藏记录页视图
      url: '/collection',
      templateUrl: "tpl/collection.html"
    })
    .state('setting', {// 设置页视图
      url: '/setting',
      templateUrl: "tpl/setting.html"
    });
});

var goback = function() {
  return window.history.back();
};

// 底部菜单状态控制
aystore.controller('BotmenuController', function($scope, $state, $timeout) {
  // 初始化
  $scope.path1 = "img/home-selected.jpg";
  $scope.path2 = "img/ay.jpg";
  $scope.path3 = "img/mine.jpg";
  $scope.txtClass1 = 1;
  $scope.txtClass2 = 0;
  $scope.txtClass3 = 0;

  // 点击第一个按钮时的动作
  $scope.select1 = function() {
    $scope.path1 = "img/home-selected.jpg";
    $scope.path2 = "img/ay.jpg";
    $scope.path3 = "img/mine.jpg";
    $scope.txtClass1 = 1;
    $scope.txtClass2 = 0;
    $scope.txtClass3 = 0;
    // $timeout(function () {
    //   $state.go("home");
    // }, 100);

  };
  // 点击第二个按钮时的动作
  $scope.select2 = function() {
    $scope.path1 = "img/home.jpg";
    $scope.path2 = "img/ay-selected.jpg";
    $scope.path3 = "img/mine.jpg";
    $scope.txtClass1 = 0;
    $scope.txtClass2 = 1;
    $scope.txtClass3 = 0;
    // $timeout(function () {
    //   $state.go("ayculture");
    // }, 100);
  };
  // 点击第三个按钮时的动作
  $scope.select3 = function() {
    $scope.path1 = "img/home.jpg";
    $scope.path2 = "img/ay.jpg";
    $scope.path3 = "img/mine-selected.jpg";
    $scope.txtClass1 = 0;
    $scope.txtClass2 = 0;
    $scope.txtClass3 = 1;
    // $timeout(function () {
    //   $state.go("mine");
    // }, 100);
  };
});

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
      $scope.isType1 = function(type) {
        return type == 1 ? true : false;
      };
      $scope.isType2 = function(type) {
        return type == 2 ? true : false;
      };
    }, function() {
      alert('error');
    });
});
// 文章详情页控制
aystore.controller('ArtdetailController', function($rootScope, $scope, $http) {
  $scope.pageTitle = "文章详情";
  $http.get('data/artdetail.json', {
    params: {
      "custId": "12323",
      "data": "artdetail"
    },
    responseType: "json"
  })
  .then(function(res) {
    console.log(res);
    $rootScope.art = res.data.data;
    $scope.art = res.data.data;

  }, function() {
    alert('error');
  });
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
      console.log(res.data);
      console.log(res.data.data);
      $rootScope.mine = res.data.data;
      $scope.mine = res.data.data;
    }, function() {
      alert('error');
    });
});

// 消费记录
aystore.controller('RecordController', function($rootScope, $scope) {
  $scope.mine = $rootScope.mine;
  $scope.pageTitle = "消费记录";
});

// 设置
aystore.controller('SettingController', function($rootScope, $scope) {
  $scope.mine = $rootScope.mine;
  console.log($scope.mine);
  $scope.pageTitle = "设置";
});

// 店铺详情
aystore.controller('StrdetailController', function($rootScope, $scope, $http, $timeout) {
  $http.get('data/strdetail.json', {
      params: {
        "custId": "12323",
        "data": "strdetail"
      },
      responseType: "json"
    })
    .then(function(res) {
      $rootScope.strdetail = res.data.data;
      $scope.strdetail = res.data.data;
      console.log($rootScope.strdetail);
      $rootScope.pageTitle = $rootScope.strdetail.strName;
    }, function() {
      alert('error');
    });
    $scope.setDate = function () {
      jeDate({
        dateCell: "#dateinput",
        format: "YYYY-MM-DD hh:mm:ss",
        isinitVal: true,
        isTime: true
      });
    };
    // $('.sec-aySrvPrice input.chk-aysrv').iCheck({
    //    checkboxClass: 'icheckbox_polaris'
    //    // radioClass: 'iradio_polaris',
    //    // increaseArea: '-10' // optional
    // });
    $timeout(function () {
      $('input').iCheck({
         checkboxClass: 'icheckbox_polaris'
         // radioClass: 'iradio_polaris',
         // increaseArea: '-10' // optional
      });
    });
    // 服务类型的选择
    // --主服务的时间段
    $('.sec-aySrvPrice input').
    // --其他服务的类型

    // 人数的选择

});
// 支付
aystore.controller('PayController', function($rootScope, $scope, $http) {
  // $http.get('data/strdetail.json', {
  //   params: {
  //     "custId": "12323",
  //     "data": "strdetail"
  //   },
  //   responseType: "json"
  // })
  // .then(function(res) {
  //   $rootScope.strdetail = res.data.data;
  //   $scope.strdetail = res.data.data;
  //   console.log($rootScope.strdetail);
  //   $rootScope.pageTitle = $rootScope.strdetail.strName;
  // }, function() {
  //   alert('error');
  // });

  // $scope.setDate = function() {
  //   jeDate({
  //     dateCell: "#dateinput",
  //     format: "YYYY-MM-DD hh:mm:ss",
  //     isinitVal: true,
  //     isTime: true
  //   });
  // };
});

// 支付成功
aystore.controller('PaysuccessfulController', function($rootScope, $scope, $http) {
  // $http.get('data/strdetail.json', {
  //   params: {
  //     "custId": "12323",
  //     "data": "strdetail"
  //   },
  //   responseType: "json"
  // })
  // .then(function(res) {
  //   $rootScope.strdetail = res.data.data;
  //   $scope.strdetail = res.data.data;
  //   console.log($rootScope.strdetail);
  //   $rootScope.pageTitle = $rootScope.strdetail.strName;
  // }, function() {
  //   alert('error');
  // });

  // $scope.setDate = function() {
  //   jeDate({
  //     dateCell: "#dateinput",
  //     format: "YYYY-MM-DD hh:mm:ss",
  //     isinitVal: true,
  //     isTime: true
  //   });
  // };
});

