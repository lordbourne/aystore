/**
 * index 页实现的功能
 *
 * 获取地理位置信息：当前城市与市区
 * 获取所在位置周边的店名
 * 店铺搜索功能：按店名，服务等
 * 排序规则
 */

$(document).ready(function() {
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
//
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
      iconLocation = 'icon/location-yellow.png';
  var html = [
  '<div class="store-item">',
      '<div class="item-box">',
        '<div class="icon">',
          '<img src="',
          iconLocation,
          '" alt=",

          '">'
        </div>
        <div class="box-content clearfloat">
          <img class="picture" src="img/shop1.jpg" alt="picture">
          <div class="name">
            成都艾瑞建设路保健养生店
          </div>
          <div class="order clearfloat">
            <a class="btn btn-small btn-blue" href="store-info.html">
              预定
            </a>
            <span class="maxnumber">
              <span class="text-orange">200</span> 人/次
            </span>
          </div>
          <div class="service">
            艾灸 <span class="text-orange">80</span> 元/小时 艾叶洗脚 <span class="text-orange">30</span> 元/次 保健 <span class="text-orange">30</span> 元/次 针灸
          </div>
          <div class="address">
            成都市成华区建设北路二段44号脸红小区5栋12号
          </div>
        </div>
      </div>
    </div>



  ];


});
