$(document).ready(function() {
  $.ajax({
    url: 'js/artData.json',
    type: 'GET',
    dataType: 'json',
    data: {},
    success: function (data) {
      var artNum = data.data.length;
      for (var i=0; i<artNum; i++) {
        if () {

        }
      }
    }
  });


  var collected = 0; // 收藏状态，从返回数据中获得
  var liked = 0; // 点赞状态，从返回数据中获得
  $('#collect').click(function() {
    if (!collected) { // 如果还未收藏
      $(this).find('img').removeClass('inactive');
      collected = 1;
      // 向服务器发送收藏数据
    } else {
      $(this).find('img').addClass('inactive');
      collected = 0;
      // 向服务器发送收藏数据
    }
  });
  $('#like').click(function() {
    if (!liked) { // 如果还未收藏
      $(this).find('img').removeClass('inactive');
      liked = 1;
      // 向服务器发送点赞状态
    } else {
      $(this).find('img').addClass('inactive');
      liked = 0;
      // 向服务器发送点赞状态
    }
  });
});
