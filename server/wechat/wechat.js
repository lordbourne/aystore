'use strict';

var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var util = require('./util');
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

Wechat.prototype.reply = function (data) {
  var content = this.body;
  // console.log(this);
  // console.log(this.body);
  var message = this.weixin;
  var xml = util.tpl(content, message);

  this.status = 200;
  this.type = 'application/xml';
  this.body = xml;
};

module.exports = Wechat;
