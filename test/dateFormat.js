'use strict';
Array.prototype.contains = function(obj) {
  var i = this.length;
  while (i--) {
    if (this[i] === obj) {
      return true;
    }
  }
  return false;
}

function isDayInRange(date, ruleRaw) {
  var day = new Date(date).getDay();
  day = (day === 0) ? 7 : day;
  var rule = ruleRaw.replace(/ /gi, ""); // 去空格，如："ff,  f, d ,f " -> "ff,f,d,f"
  var arr = [];
  var arr1 = rule.split(",");
  var beg = 0;
  var end = 0;
  var item = "";
  for (let i=0; i<arr1.length; i++) {
    item = arr1[i];
    if (/-/.test(item)) {
      beg = parseInt(item.split("-")[0]);
      end = parseInt(item.split("-")[1]);
      while (beg <= end) {
        arr.push(beg);
        beg++;
      }
    } else {
      arr.push(parseInt(item));
    }
  }
  console.log(day);
  console.log(arr);
  console.log(arr.contains(day));
  if (arr.contains(day)) {
    return true;
  } else {
    return false;
  }
}
isDayInRange(new Date(), "4,5,6-7");
