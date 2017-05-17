'use strict';

var xml2js = require('xml2js');
var Promise = require('bluebird');
var tpl = require('./tpl');


exports.parseXMLAsync = function(xml) {
  return new Promise(function (resolve, reject) {
    xml2js.parseString(xml, {trim: true}, function (err, content) {
      if (err) {
        reject(err);
      } else {
        resolve(content);
      }
    });
  });
};

function formatMessage(result) {
  var message = {};
  var key, item;
  var keys = [];
  if (typeof result === 'object') {
    var keys = Object.keys(result);// 遍历 object 里的每个 key
    for (var i=0; i<keys.length; i++) {
      item = result[keys[i]];
      key = keys[i];

      if(!(item instanceof Array) || item.length === 0) {
        continue;
      }

      // 值是数组，且只有一个元素时
      if (item.length === 1) {
        var val = item[0];
        if (typeof val === 'object') {
          message[key] = formatMessage(val);
        } else {
          message[key] = (val || '').trim();
        }
      } else {
        message[key] = [];
        for (var j=0, k=item.length; j<k; j++) {
          message[key].push(formatMessage(item[j]));
        }
      }
    }
  }
  return message;
}

exports.formatMessage = formatMessage;

// 作用？content 是？message 是？
exports.tpl = function (content, message) {
  console.log('wechat/util定义的 tpl 函数的参数 content: \r\n' + content);
  var info = {};
  var type = 'text';
  var fromUserName = message.FromUserName;
  var toUserName = message.ToUserName;

  if (Array.isArray(content)) {
    type = 'news';
  }

  type = content.type || type;
  info.content = content;
  info.createTime = new Date().getTime();
  info.msgType = type;
  info.toUserName = fromUserName;
  info.fromUserName = toUserName;

  // 渲染模板
  console.log('要填充模板的数据：');
  console.log(info);
  return tpl.compiled(info);
};
