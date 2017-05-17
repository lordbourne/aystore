// 封装成中间件，其他文件可以引入，返回生成器函数
// 接收 config 参数
// 暴露出 generator 对象，作为 app.use() 的参数
//
//
'use strict';

var sha1 = require('sha1');
var getRawBody = require('raw-body');
var Wechat = require('./wechat');
var util = require('./util');

module.exports = function (opts, handler) {
  var wechat = new Wechat(opts);

  return function *(next) {
    var that = this;
    var token = opts.token;
    var signature = this.query.signature;
    var timestamp = this.query.timestamp;
    var nonce = this.query.nonce;
    var echostr = this.query.echostr;

    var str = [token, timestamp, nonce].sort().join('');// 按字典排序后拼接
    console.log('字典排序并拼接后：' + str);
    str = sha1(str);// sha1 加密

    if (this.method === 'GET') {
      if (str === signature) {
        this.body = echostr;
      } else {
        this.body = 'wrong';
      }
    // 消息机制一般是 POST 请求
    } else if (this.method === 'POST') {
      if (str !== signature) {
        this.body = 'wrong';
        return false;
      }
      // 获取 xml 数据
      var data = yield getRawBody(this.req, {
        length: this.length,
        limit: '1mb',
        encoding: this.charset
      });
      // 第一次解析 xml，解析为 json，但格式不是太好
      var content = yield util.parseXMLAsync(data);
      // console.log(content);
      // 第二次解析
      var message = util.formatMessage(content.xml);
      // 打印 post 数据
      console.log(message);

      this.weixin = message;
      // console.log(this.body);
      yield handler.call(this, next);// 啥意思
      wechat.reply.call(this);// 把 this(即..) 传给 reply

    }
  };
};


