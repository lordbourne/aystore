$(document).ready(function() {
  jeDate({
    dateCell: "#dateinfo",
    format: "YYYY-MM-DD hh:mm:ss",
    isinitVal: true,
    // isTime: true, //isClear:false,
    minDate: "2014-09-19 00:00:00",
    okfun: function(val) {
      alert(val);
    }
  });
});
