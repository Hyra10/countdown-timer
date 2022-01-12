!(function (window) {
  'use strict';
  var btnStart = document.getElementById('ClockButtonStart');
  setDropDownToFiveYears();
  setCustomTimeOption();
  var timer = new window.Timer();
  var timerView = new window.TimerView();
  timer.register(timerView.tick);

  btnStart.onclick = function () {
    var environement = {
      backColor: document.getElementById('background-color'),
      mainText: document.getElementById('main-text'),
      textColor: document.getElementById('text-color'),
      textLink: document.getElementById('text-link'),
    };
    var options = getInputValues();
    personalizeView(environement);
    timerView.initTimerView(options);
    timer.start(options);
  };
  function setDropDownToFiveYears() {
    var yearDd = document.getElementById('year-list');
    var year = new Date().getFullYear();

    for (var i = year; i < year + 5; i++) {
      var option = document.createElement('option');
      option.value = i;
      option.text = i;
      yearDd.appendChild(option);
    }
  }
  function setCustomTimeOption() {
    var customOption = document.getElementById('customOption');
    var timeUtil = window.timeUtil;
    var dateFormatted = timeUtil.formatTime();
    customOption.value = dateFormatted.value;
    customOption.text = dateFormatted.text;
  }
  function getInputValues() {
    // Clock variables.
    var y = document.getElementById('year-list');
    var m = document.getElementById('month-list');
    var d = document.getElementById('day-list');
    var t = document.getElementById('hour-list');
    var tz = document.getElementById('timezone-list');

    // Other content variables.
    var ff = document.getElementById('font-family-list');

    // The clock requires that you pass it all these parameters to function.
    return {
      year: y.options[y.selectedIndex].value,
      month: m.options[m.selectedIndex].value,
      day: d.options[d.selectedIndex].text,
      time: t.options[t.selectedIndex].value,
      timeZone: tz.options[tz.selectedIndex].value,
      fontFamily: ff.options[ff.selectedIndex].text,
    };
  }

  function personalizeView(environement) {
    // DOM Changes for personalization variables.
    document.getElementById('text-change').innerText = environement.mainText.value;
    document.getElementById('text-change').href = environement.textLink.value;
    document.getElementsByClassName('purple-background')[0].style.backgroundColor =
      environement.backColor.value;
    document.getElementById('ClockButtonStart').style.borderColor = environement.backColor.value;
    document.getElementsByTagName('body')[0].style.color = environement.textColor.value;
    document.getElementById('text-change').style.color = environement.textColor.value;
  }
})(window);
