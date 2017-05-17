// app.js 入口文件
//
//
//
'use strict';

var Koa = require('koa');
var path = require('path');
var wechat = require('./wechat/g');
var util = require('./libs/util');
var config = require('./config');
var weixin = require('./weixin');
var wechat_file = path.join(__dirname, './config/wechat.txt');


var port = '1234';

var app = new Koa();

// app.use(function *(next) {
//   console.log(this.query);
//   this.body = '123';
// });
app.use(wechat(config.wechat, weixin.reply));
app.listen(port);
console.log('Listening on ' + port);





