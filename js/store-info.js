$(document).ready(function() {

  $.ajax({
    url: 'js/store.json',
    type: 'GET',
    dataType: 'json',
    data: {},
    beforeSend: function(XMLHttpRequest) {
      // 数据正在加载时的特效
    },
    success: function (data) {
      // banner 部分, 添加店的相关图片
      console.log(data);
      var picItems = data.strPicture;
      var html = '';
      var len = picItems.length;
      for (var i=0; i<len; i++) {
        html = [
          html,
          '<img src="',
          picItems[i],
          '" alt="">'
        ].join('');
      }
      $('#banner').append($(html));
      $('#banner').cycle();
      // 简介部分与服务信息
      var srvInfo = data.srvInfo;

    }
  });
  //

  // jeDate({
  //   dateCell: "#dateinfo",
  //   format: "YYYY-MM-DD hh:mm:ss",
  //   isinitVal: true,
  //   // isTime: true, //isClear:false,
  //   minDate: "2014-09-19 00:00:00",
  //   okfun: function(val) {
  //     alert(val);
  //   }
  // });
});
