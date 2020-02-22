window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* Таймер */
  function countTimer(deadLine) {
    const timerHours = document.querySelector('#timer-hours'),
      timerMinutes = document.querySelector('#timer-minutes'),
      timerSeconds = document.querySelector('#timer-seconds');

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

      if (timer.timeRemaining > 0) {
        setTimeout(updateClock, 1000);
      } else {
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
      }
    }

    updateClock();
  }
  let date = new Date();
  countTimer(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()+1} 00:00:00`);
  /* /Таймер */

  /* Меню */
  function toggleMenu() {
    const btnMenu = document.querySelector('.menu'),
      btnClose = document.querySelector('.close-btn'),
      menu = document.querySelector('menu'),
      menuItems = menu.querySelectorAll('ul > li > a'),
      mainScroll = document.querySelector('main a');

    btnMenu.addEventListener('click', () => {
      menu.classList.toggle('active-menu');
    });

    btnClose.addEventListener('click', () => {
      menu.classList.toggle('active-menu');
    });

    menuItems.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const blockID = item.getAttribute('href').substr(1);
        document.getElementById(blockID).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        menu.classList.toggle('active-menu');
      });
    });

    mainScroll.addEventListener('click', (e) => {
      e.preventDefault();
      const blockID = mainScroll.getAttribute('href').substr(1);
      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  }
  toggleMenu();
  /* /Меню */

  /* PopUp */
  function togglePopup() {
    const popup = document.querySelector('.popup'),
      btnPopupClose = document.querySelector('.popup-close'),
      btnsPopup = document.querySelectorAll('.popup-btn');

    btnsPopup.forEach((item) => {
      item.addEventListener('click', () => {
        popup.querySelector('.popup-content').style.top = '-100%';
        popup.style.display = 'block';
      });
    });

    btnPopupClose.addEventListener('click', () => {
      popup.removeAttribute('style');
    });

    let width = document.documentElement.clientWidth;
    let percent = -100;

    requestAnimationFrame(function popupAnimation() {
      while (percent !== 10) {
        popup.querySelector('.popup-content').style.top = (++percent) + '%';
        console.log('percent: ', percent);
      }
      console.log(popup.querySelector('.popup-content'));
    });

    window.addEventListener('resize', () => {
      width = document.documentElement.clientWidth;
      if (width >= 768) {
        btnsPopup.forEach((item) => {
          item.addEventListener('click', () => {
            requestAnimationFrame();
          });
        });
      }
    });

    if (width >= 768) {
      btnsPopup.forEach((item) => {
        item.addEventListener('click', () => {
          requestAnimationFrame();
        });
      });
    }
  }
  togglePopup();
  /* /PopUp */
});