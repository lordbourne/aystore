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
      // 标题部分
      $('#topbar .name').html(data.strName);
      // banner 部分, 添加店的相关图片
      var picItems = data.strPicture;
      var len = picItems.length;
      if (len == 1) {// 一张图片的话就直接显示
        var html = '';
        html = [
          html,
          '<img src="',
          picItems[0],
          '" alt="">'
        ].join('');
        $('#container .sec-banner').html(html);
      } else if (picItems.length > 1) {// 两张以上图片采用轮播特效
        // 添加 indicators
        var html = '<li data-target="#carousel-example-generic" data-slide-to="0" class="active></li>';// 第一个有 active 类
        for (var i=1; i<len; i++) {
          html = [
            html,
            '<li data-target="#carousel-example-generic" data-slide-to="',
            i,
            '"></li>'
          ].join('');
        }
        // $('#container .sec-banner ol').append($(html));
        // 添加项目
        var html = '';
        html = [
            html,
            '<div class="item active">',
              '<img src="',
              picItems[0],
              '" alt="...">',
              '<div class="carousel-caption">',
              '</div>',
            '</div>',
          ].join('');// 第一个有 active 类
        for (var i=1; i<len; i++) {
          html = [
            html,
            '<div class="item">',
              '<img src="',
              picItems[i],
              '" alt="...">',
              '<div class="carousel-caption">',
              '</div>',
            '</div>',
          ].join('');
        }
        $('#container .sec-banner .carousel-inner').append($(html));
      }

      // 店的简介部分
      var $secIntro = $('#container .sec-intro');
      $secIntro.find('.intro').html(data.srvIntro);
      $secIntro.find('.address').html(data.strCity + data.strDistrict + data.strAddress);

      // 初始化 post 数据
      var postData = {};
      // postData.custId = getCustId();
      // 服务价格与选择部分
      var $secOrder = $('#container .sec-order');
      var $iconFull = $secOrder.find('.icon-full');
      data.full == 1 ? $iconFull.show() : $iconFull.hide();
      // ----日期时间选择
      var ordTime = null;// 保存选择的日期
      $secOrder.find('.sec-date img').click(function(event) {
        jeDate({
          dateCell: "#dateinput",
          format: "YYYY-MM-DD hh:mm:ss",
          isinitVal: true,
          isTime: true //isClear:false,

          // minDate: "2014-09-19 00:00:00",
        })
      });


      // ----主服务
      var html = '';
      var items = data.aySrvPrice;
      var item = '';
      for (var i in items) {
        item = items[i];
        html = [
                  html,
                  '<li class="clearfloat">',
                    '<div class="time">',
                      item.weekday,
                      '&nbsp;',
                      item.srvTime,
                    '</div>',
                    '<div class="price">',
                      '<span class="txt-number">',
                        item.price,
                      '</span>',
                      '&nbsp;',
                      item.unit,
                    '</div>',
                  '</li>'
                ].join('');
      }
      $secOrder.find('.sec-aySrvPrice ul').append($(html));
      // 判断选择的日期位于哪个时间段
      $secOrder.find('.sec-aySrvPrice checkbox1').click(function(event) {
        $(this).toggleClass('checked');
      });


      // ----其他服务
      var html = '';
      var items = data.otherSrvPrice;
      var item = '';
      for (var i in items) {
        item = items[i];
        html = [
                  html,
                  '<li class="clearfloat">',
                    '<div class="icon checkbox" data-></div>',
                    '<div class="service">',
                    item.srvName,
                    '</div>',
                    '<div class="price">',
                      '<span class="txt-number">',
                        item.price,
                      '</span>',
                      '&nbsp;',
                      item.unit,
                    '</div>',
                  '</li>'
                ].join('');
      }
      $secOrder.find('.sec-otherSrvPrice ul').append($(html));
      $secOrder.find('.sec-otherSrvPrice ul checkbox1').each(function(index, el) {
        $(this).click(function(event) {
          $(this).toggleClass('checked');
        });
      });

      // 点击支付时的动作
      $('#botbar a').click(function(event) {
        event.preventDefault();
        jeDate({
          choosefun: function(elem, val) {
          ordTime = val;
          console.log(ordTime);
          postData.ordTime = ordTime;
        }});
        // 获取表单数据
        var $aySrvChoose = $secOrder.find('.sec-aySrvPrice checkbox1');
        if ($aySrvChoose.hasClass('checked')) {
          postData.aySrvPrice.id = getTimeIntervalId(ordTime, data.aySrvPrice);
        } else {
          postData.aySrvPrice = "";
        }
        var $otherSrvChoose = secOrder.find('.sec-otherSrvPrice ul checkbox1');
        $otherSrvChoose.each(function(index, el) {
          if ($(this).hasClass('checked')) {
            postData.otherSrvPrice[index].id = data.otherSrvPrice[index].id;
          } else {
            postData.otherSrvPrice[index].id = "";
          }
        });
        window.location.href = "pay.html";
      });



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
