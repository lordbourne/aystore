// 获取全国各地的城市数据和县区数据，按一定规则显示出来

var cities = {
	"成都": [
		"全城",
		"青羊区",
		"锦江区",
		"金牛区",
		"成华区",
		"武侯区",
		"温江区",
		"新都区",
		"龙泉驿区",
		"青白江区",
		"高新区",
		"郫县",
		"双流县",
		"新津县",
		"金堂县",
		"大邑县",
		"蒲江县",
		"邛崃市",
		"崇州市",
		"彭州市",
		"都江堰市"
	],
	"北京": [
    "东城区",
    "西城区",
    "海淀区",
    "朝阳区",
    "丰台区",
    "石景山区",
    "通州区",
    "顺义区",
    "房山区",
    "大兴区",
    "昌平区",
    "怀柔区",
    "平谷区",
    "门头沟区",
    "密云县",
    "延庆县"
	]
};
function insertAfter(newElement, targetElement) {
	var parent = targetElement.parentNode;
	if (parent.lastChild == targetElement) {
		parent.appendChild(newElement);
	} else {
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
}

$(document).ready(function() {
  var $choose = $('#choose');
  var $countyList = $('#county-list');
  $choose.click(function () {
     var tmpArr = cities["成都"];
     for (var i = 0, len = tmpArr.length; i < len; i++) {
       // var textNode = document.createTextNode(tmpArr[i]);
       // var list = document.createElement('li');
       //  // list.addClass('block-list');
       // list.appendChild(textNode);
       // countyList.appendChild(list);
       // var $li = $('<li>'. tmpArr . '</li>');
     }
  });

});

// choose.onclick = function() {
// 	// A popup list of counties of a city

// };

