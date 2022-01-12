!(function () {
  'use strict';
  var ERROR_MSG =
    'The end time is negative. \n \n This can happen if the ' +
    "time you're looking for has already passed in the timezone you specified.";

  //private function to stop  timer
  function handleError() {
    alert(ERROR_MSG);
  }

  function stopTimer() {
    clearInterval(window.timeInteval);
  }

  function Timer() {
    window.Observable.call(this);
    this.timeUtil = window.timeUtil;
  }

  // Inherit from Observable because direct association and
  // needs from Observer to communicate time changes
  Timer.prototype = Object.create(window.Observable.prototype);

  // Starts timer with specific end time.
  Timer.prototype.start = function (options) {
    // Clear interval if needed and set remaining time.
    if (window.timeInteval) {
      stopTimer();
    }

    var remainingTime = this.timeUtil.getRemainingTime(options);
    if (remainingTime.total < 0) {
      handleError();
      return;
    }

    window.timeInteval = setInterval(
      function () {
        remainingTime = this.timeUtil.getRemainingTime(options);
        this.notify(remainingTime);
        if (remainingTime.total <= 0) {
          stopTimer();
        }
      }.bind(this),
      1000,
    );
  };

  window.Timer = Timer;
})();
