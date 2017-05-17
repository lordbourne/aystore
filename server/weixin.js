'use strict';

exports.reply = function* (next) {
  var message = this.weixin;

  // 对事件的响应
  if (message.MsgType === 'event') {
    // 用户关注时触发，订阅事件
    if (message.Event === 'subscribe') {
      if (message.EventKey) {
        console.log('扫二维码进来：' + message.EventKey + ' ' + message.ticket);
      }
      this.body = '你订阅了这个号\r\n' + '消息 ID：' + message.MsgId;
    } else if (message.Event === 'unsubscribe') {
      console.log('取关');
      this.body = '取关';
    }
  } else {

  }
  yield next;// 有什么用
};
