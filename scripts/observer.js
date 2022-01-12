!(function () {
  'use strict';

  function Observable() {
    this.observers = [];
  }

  Observable.prototype.notify = function (data) {
    this.observers.forEach(function (observer) {
      observer.callback(data);
    });
  };

  Observable.prototype.register = function (fn) {
    var observer = { callback: fn };
    this.observers.push(observer);
    return observer;
  };

  window.Observable = Observable;
})();
