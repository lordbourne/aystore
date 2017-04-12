$(document).ready(function() {

  $.ajax({
    url: 'js/store1.json',
    type: 'GET',
    dataType: 'json',
    success: function (data) {
      // banner 部分, 添加店的相关图片
      var picItems = data.strPicture;
      var html = '<section class="store-pic" id="banner">';
      var len = picItems.length;
      for (var i=0 i<len; i++) {
        html = [
          html,
          '<img src="',
          picItems[key];
          '" alt="">'
        ].join('');
      }
      html = html + '</section>';
      $('#container').append($(html));
      // 简介部分
      //
      // 详细信息


    }
  });

  jeDate({
    dateCell: "#dateinfo",
    format: "YYYY-MM-DD hh:mm:ss",
    isinitVal: true,
    // isTime: true, //isClear:false,
    minDate: "2014-09-19 00:00:00",
    okfun: function(val) {
      alert(val);
    }
  });
});
