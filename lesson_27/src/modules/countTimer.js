'use strict';

export default function countTimer(deadLine) {
  const timerHours = document.querySelector('#timer-hours'),
    timerMinutes = document.querySelector('#timer-minutes'),
    timerSeconds = document.querySelector('#timer-seconds');
  let interval = '';

  function getTimeRemaining() {
    let dateStop = new Date(deadLine).getTime(),
      dateNow = new Date().getTime(),
      timeRemaining = (dateStop - dateNow) / 1000,
      seconds = Math.floor(timeRemaining % 60),
      minutes = Math.floor((timeRemaining / 60) % 60),
      hours = Math.floor(timeRemaining / 3600) % 24;

    return {
      timeRemaining,
      hours,
      minutes,
      seconds,
      dateStop
    };
  }

  function updateClock() {
    let timer = getTimeRemaining();

    timerHours.textContent = (timer.hours < 10) ? '0' + timer.hours : timer.hours;
    timerMinutes.textContent = (timer.minutes < 10) ? '0' + timer.minutes : timer.minutes;
    timerSeconds.textContent = (timer.seconds < 10) ? '0' + timer.seconds : timer.seconds;

    if (timer.timeRemaining <= 0) {
      clearInterval(interval);
      timerHours.textContent = '00';
      timerMinutes.textContent = '00';
      timerSeconds.textContent = '00';
    }
  }
  updateClock();
  interval = setInterval(updateClock, 1000);
}
