!(function () {
  'use strict ';

  var cons = {
    MAX_LENGTH: 2,
    SLIDE: '.slide',
    appliedClass: 'slide',
    breakOne: '9',
    breakTwo: 59,
  };
  // For use in SlideDownClass function.
  var clock = {
    days: document.getElementById('days'),
    innerDays: document.getElementById('days').getElementsByTagName('div'),
    hours: document.getElementById('hours').getElementsByTagName('div'),
    minutes: document.getElementById('minutes').getElementsByTagName('div'),
    seconds: document.getElementById('seconds').getElementsByTagName('div'),
  };
  var timeResult = {
    days: '',
    hours: '',
    minutes: '',
    seconds: '',
  };
  var body = document.getElementsByTagName('body')[0];
  var timerView = {
    clearAnimations: function clearAnimations() {
      var oldAssigned = document.querySelectorAll(cons.SLIDE);
      for (var i = 0; i < oldAssigned.length; i++) {
        oldAssigned[i].className = '';
      }
    },
    minutesAnimation: function minutesAnimation() {
      // change minutes
      clock.minutes[1].className = cons.appliedClass;
      // change minutes
      clock.minutes[0].className = timeResult.minutes[1] === cons.breakOne ? cons.appliedClass : '';
    },
    // Add the appropriate class for the specific moment in the animation.
    applyAnimationClasses: function animation(remainingTime) {
      // clear the old animations
      timerView.clearAnimations();

      // every second
      clock.seconds[1].className = 'seconds-units';
      // every second
      clock.seconds[0].className = timeResult.seconds[1] === cons.breakOne ? cons.appliedClass : '';

      clock.minutes[1].className =
        remainingTime.seconds === cons.breakOne
          ? timerView.minutesAnimation(cons.appliedClass)
          : '';

      if (remainingTime.minutes === cons.breakTwo && remainingTime.seconds === cons.breakTwo) {
        // change hours
        clock.hours[1].className = cons.appliedClass;

        if (timeResult.hours[1] === '0') {
          // change hours
          clock.hours[0].className = cons.appliedClass;
        }
      }

      if (
        remainingTime.hours === 23 &&
        remainingTime.minutes === cons.breakTwo &&
        remainingTime.seconds === cons.breakTwo
      ) {
        // change days
        clock.days[timeResult.days.length - 1].className = cons.appliedClass;
      }

      if (
        remainingTime.days == 0 &&
        remainingTime.hours == 0 &&
        remainingTime.minutes == 0 &&
        remainingTime.seconds == 0
      ) {
        clock.seconds[1].className = '';
      }
    },
    setFontFamily: function updateFont(fontFamily) {
      var container = body.classList;
      if (fontFamily === 'Roboto') {
        container.add('roboto-regular');
      } else {
        container.remove('roboto-regular');
      }
    },
    updateDayBoxes: function updateBoxes(dayLength) {
      var htmlDays = '';
      clock.days.innerHTML = '';
      for (var b = 0; b < dayLength; ++b) {
        htmlDays += '<span class="digit"><div>0</div></span> ';
      }
      clock.days.innerHTML = htmlDays;
    },
    checkTime: function checkTime(i) {
      if (i < 10) {
        i = '0' + i;
      }
      return i;
    },
  };

  function TimerView() {
    this.timeUtil = window.timeUtil;
  }

  TimerView.prototype.initTimerView = function (options) {
    var remainingTime = this.timeUtil.getRemainingTime(options);
    var days = String(remainingTime.days);
    timeResult.days = days.length == 1 ? (timeResult.days = '00') : days;
    if (remainingTime.total > 0) {
      timerView.updateDayBoxes(timeResult.days.length);
    }
    timerView.setFontFamily(options.fontFamily);
  };

  TimerView.prototype.tick = function (remainingTime) {
    var daysString = String(remainingTime.days);
    var daysLengthDiff = timeResult.days.length - daysString.length - 1;
    for (var i = 0; i < clock.innerDays.length; ++i) {
      if (daysLengthDiff < i) {
        clock.innerDays[i].innerHTML = daysString.length == 1 ? daysString[0] : daysString[i];
      } else {
        clock.innerDays[i].innerHTML = '0';
      }
    }
    //Set values for hours, minutes and seconds to ve shown.
    timeResult.hours = String(timerView.checkTime(remainingTime.hours));
    timeResult.minutes = String(timerView.checkTime(remainingTime.minutes));
    timeResult.seconds = String(timerView.checkTime(remainingTime.seconds));

    for (var j = 0; j < cons.MAX_LENGTH; ++j) {
      clock.hours[j].innerHTML = timeResult.hours[j];
      clock.minutes[j].innerHTML = timeResult.minutes[j];
      clock.seconds[j].innerHTML = timeResult.seconds[j];
    }
    timerView.applyAnimationClasses(remainingTime);
  };
  window.TimerView = TimerView;
})();
