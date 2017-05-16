// 封装成中间件，其他文件可以引入，返回生成器函数
// 接收 config 参数
// 暴露出 generator 对象
//
//
'use strict';

var sha1 = require('sha1');
var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var fs = require('fs');

var prefix = 'https://api.weixin.qq.com/cgi-bin/';
var api = {
  accessToken: prefix + 'token?grant_type=client_credential'
};
function Wechat(opts) {
  var that = this;
  this.appID = opts.appID;
  this.appSecret = opts.appSecret;
  this.getAccessToken = opts.getAccessToken;
  this.saveAccessToken = opts.saveAccessToken;

  this.getAccessToken()
  .then(function (data) {// 检验有效性，文件里没有或者失效都要更新
    try {
      data = JSON.parse(data);
    } catch(e) {
      return that.updateAccessToken();
    }

    if (that.isValidAccessToken(data)) {
      return Promise.resolve(data);
    } else {
      return that.updateAccessToken();
    }
  })
  .then(function (data) {
    console.log('access_token 如下: ');
    console.log(data);
    that.access_token = data.access_token;
    that.expires_in = data.expires_in;

    that.saveAccessToken(data);
  });
}

Wechat.prototype.isValidAccessToken = function (data) {
  if (!data || !data.access_token || !data.expires_in) {
    return false;
  }

  var access_token = data.access_token;
  var expires_in = data.expires_in;
  var now = new Date().getTime();

  if (now < expires_in) {
    return true;
  } else {
    return false;
  }
};

Wechat.prototype.updateAccessToken = function (data) {
  var appID = this.appID;
  var appSecret = this.appSecret;
  var url = api.accessToken + '&appid=' + appID + '&secret=' + appSecret;
  console.log(url);

  return new Promise(function (resolve, reject) {
    request({
      url: url,
      json: true
    })
    .then(function (response) {
      var data = response[1];
      var now = new Date().getTime();
      var expires_in = now + (data.expires_in - 20) * 1000;
      data.expires_in = expires_in;
      resolve(data);
    });
  });
};

module.exports = function (opts) {
  var wechat = new Wechat(opts);

  return function *(next) {
    console.log(opts);
    console.log(this.query);
    var token = opts.token;
    var signature = this.query.signature;
    var timestamp = this.query.timestamp;
    var nonce = this.query.nonce;
    var echostr = this.query.echostr;

    var str = [token, timestamp, nonce].sort().join('');// 按字典排序后拼接
    console.log('字典排序并拼接后：' + str);
    str = sha1(str);// sha1 加密

    if (str === signature) {
      this.body = echostr;
    } else {
      this.body = 'wrong';
    }
  };
};


