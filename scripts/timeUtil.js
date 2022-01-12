!(function () {
  'use strict ';

  var timeUtil = {};
  function parseToTz(endDate, offset) {
    var utc = endDate.getTime() + endDate.getTimezoneOffset() * 60000;
    return new Date(utc + 3600000 * offset);
  }

  timeUtil = {
    /*This function formats the time just in order to allow easy test of
        the timer
        */
    formatTime: function () {
      var customTestDate = new Date();
      var h = customTestDate.getHours();
      var minutes = customTestDate.getMinutes() + 2;
      var m = minutes < 10 ? '0' + minutes : minutes;
      if (h >= 12) {
        h = h - 12;
        dd = 'PM';
      }
      if (h == 0) {
        h = 12;
      }
      return {
        value: customTestDate.getHours() + ':' + m,
        text: h + ':' + m + ' ' + dd,
      };
    },
    getRemainingTime: function getRemainingTime(options) {
      var time = options.time.split(':');
      var total = '';
      // Construct date.
      var endDate = new Date();
      endDate.setFullYear(options.year);
      endDate.setMonth(options.month);
      endDate.setDate(options.day);
      endDate.setHours(time[0]);
      endDate.setMinutes(time[1]);
      endDate.setSeconds(0);
      total = Date.parse(endDate) - Date.parse(parseToTz(new Date(), options.timeZone));
      return {
        total: total,
        days: Math.floor(total / (1000 * 60 * 60 * 24)),
        hours: Math.floor((total / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((total / 1000 / 60) % 60),
        seconds: Math.floor((total / 1000) % 60),
      };
    },
  };
  window.timeUtil = timeUtil;
})();
