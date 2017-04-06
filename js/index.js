/**
 * index 页实现的功能
 *
 * 获取地理位置信息：当前城市与市区
 * 获取所在位置周边的店名
 * 店铺搜索功能：按店名，服务等
 * 排序规则
 */

$(document).ready(function() {
  // 数据获取
  if (typeof localStorage.strData == "undefined") {
    // 如果本地未存储就从服务器请求数据
    $.ajax({
      url: '',
      type: 'GET',
      dataType: 'jsonp',// 跨域请求
      data: {

      },// 请求数据的格式
      beforeSend: function (XMLHttpRequest) {
        // 数据正在加载时的特效
      },
      success: function (data) {
        console.log(data);

      }
    });
  } else {
    // 如果本地已存储就从 localStorage 获取数据
  }
  var strData = {
    "timestamp": "201703191914",
    "errorCode": "0",
    "data": [
      {
        "strCity": "成都",
        "strCounty": "成华区",
        "strThumbnail": "img/shop1.jpg",
        "strName": "成都艾瑞建设路保健养生店",
        "ordStatus": "0",// 未预订
        "strPrice": 200,
        "strServices": [
          {
            "srvName": "艾灸",
            "srvPrice": 80,
            "srvUnit": "元/小时"
          },
          {
            "srvName": "艾叶洗脚",
            "srvPrice": 30,
            "srvUnit": "元/次"
          },
          {
            "srvName": "针灸",
            "srvPrice": "",
            "srvUnit": ""
          }
        ],
        "strMap": "",
        "strAddress": "建设北路二段44号脸红小区5栋12号"
      },
      {
        "strCity": "成都",
        "strCounty": "成华区",
        "strPicture": "img/shop1.jpg",
        "strName": "成都艾瑞建设路保健养生店",
        "ordStatus": "0",// 未预订
        "strPrice": 300,
        "strServices": [
          {
            "srvName": "艾灸",
            "srvPrice": 90,
            "srvUnit": "元/小时"
          },
          {
            "srvName": "艾叶洗脚",
            "srvPrice": 20,
            "srvUnit": "元/次"
          },
          {
            "srvName": "针灸",
            "srvPrice": 20,
            "srvUnit": "元/次"
          }
        ],
        "strMap": "",
        "strAddress": "建设北路二段55号科大小区6栋25号"
      },
    ]
  };

//
//
  var genStoreList = function (data) {
    // 加载模板
    // 填充数据
  };
  var num = strData['data'].length;
  console.log(num);
  for (var i = 0; i < num; i++) {
    var html = '';

    var $storeItem = $('<div><div>');
    $storeItem.addClass('store-item');
    $storeItem.appendTo('#container');

    var $itemBox = $('<div></div>');
    $itemBox.addClass('item-box');
    $itemBox.appendTo($storeItem);

    var $icon = $('<div></div>');
    $icon.addClass('icon');
    var $img = $('<img>');

  }
  $('.item-box')[0].addClass('first');

  var iconCity = '',
      iconLocation = 'img/location-yellow.png';
});
