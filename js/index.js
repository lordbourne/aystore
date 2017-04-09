/**
 * index 页实现的功能
 *
 * 获取地理位置信息：当前城市与市区
 * 获取所在位置周边的店名
 * 店铺搜索功能：按店名，服务等
 * 排序规则
 */

// todo：alert 可以换成其他特效，如遮罩层与弹出框

$(document).ready(function() {
  // 获取地理位置信息：当前城市与市区
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      alert("浏览器不支持地理定位");
    }
  }

  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("定位失败,用户拒绝请求地理定位");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("定位失败,位置信息是不可用");
        break;
      case error.TIMEOUT:
        alert("定位失败,请求获取用户位置超时");
        break;
      case error.UNKNOWN_ERROR:
        alert("定位失败,定位系统失效");
        break;
    }
    if (!localStorage.city) { // 如果没缓存，则使用默认位置: 成都
      $('#city').html('成都');
    } else { // 如果有缓存，则使用缓存，即上次的位置
      $('#city').html(localStorage.city);
    }
    // 然后提醒用户手动设置位置
    alert('请点击左上方手动设置位置');
  }

  // function showPosition(position) {
  //   var lat = position.coords.latitude; //纬度
  //   var lon = position.coords.longitude; //经度
  //   console.log('纬度:' + lat + ',经度:' + lon);
  // }

  function showPosition(position) {
    var latlon = position.coords.latitude + ',' + position.coords.longitude;
    var url = "http://api.map.baidu.com/geocoder/v2/?ak=C93b5178d7a8ebdb830b9b557abce78b&callback=renderReverse&location=" + latlon + "&output=json&pois=0";
    $.ajax({
      url: url,
      type: "GET",
      dataType: "jsonp",
      beforeSend: function() {
        // 加载特效
      },
      success: function(json) {
        if (json.status == 0) {
          // http://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-geocoding
          var city = json.result.addressComponent.city; // 城市
          var district = json.result.addressComponent.district; // 区县
          $('#city').html(district);
          localStorage.city = city;
          localStorage.district = district;
        }
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert("地址位置获取失败, 请点击左上方手动设置位置");
      }
    });
  }

  // 获取周围店铺列表数据
  var cityData;
  $.ajax({
    url: 'js/strData.json', // 只是测试，先直接请求文件
    type: 'GET',
    dataType: 'json',
    data: {},
    beforeSend: function(XMLHttpRequest) {
      // 数据正在加载时的特效
    },
    success: function(data) {
      console.log(data);
      cityData = data; // 暂时先不考虑用本地存储，因为商店数据会不断更新
      var $container = $('#container');
      var strList = data.data;
      var len = strList.length;
      // 生成模板
      var tpl;
      $.ajax({
        url: 'tpl-index-strList.html',
        type: 'GET',
        // dataType: '',
        // data: {param1: 'value1'},
        success: function (data) {
          for (var i = 0; i < len; i++) {
            $container.append(data);
          }
          // 填充数据
          $('.store-item').each(function(index, el) {
            var strItem = strList[index];
            $(this).find('img[data-thumbnail]')[0].src = strItem.strThumbnail;
            $(this).find('[data-name]').html(strItem.strName);
            if (strItem.ordStatus == 1) {
              $(this).find('[data-ordStatus]').addClass('ordered').html('已预订');
            } else {
              $(this).find('[data-ordStatus]').removeClass('ordered').html('预订');
            }
            $(this).find('[data-avgPrice]').html(strItem.avgPrice);
            var $srvList = $(this).find('[data-service]');
            var strServices = strItem.strServices;
            var html = '';
            for (var i=0; i<strServices.length; i++) {
              html = [
                html,
                strServices[i].srvName,
                '<span class="txt-number"> ',
                strServices[i].srvPrice,
                ' </span>',
                strServices[i].srvUnit,
                '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
              ].join('');
            }
            $srvList.html(html);
            $(this).find('[data-address]').html(strItem.strCity + strItem.strDistrict + strItem.strAddress);
          });
        }
      });


    }
  });
});
