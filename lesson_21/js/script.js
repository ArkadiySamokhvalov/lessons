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
    const menu = document.querySelector('menu');

    document.body.addEventListener('click', () => {
      if (event.target.matches('menu > ul > li > a, .menu, .menu > img, .menu > small, .close-btn')) {
        menu.classList.toggle('active-menu');
      } else if (menu.classList.contains('active-menu') && !event.target.matches('menu')) {
        menu.classList.remove('active-menu');
      }

      if (event.target.matches('menu > ul > li > a, main > a > img')) {
        const blockID = event.target.closest('a').getAttribute('href').substr(1);
        event.preventDefault();
        document.getElementById(blockID).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  }
  toggleMenu();
  /* /Меню */

  /* PopUp */
  function togglePopup() {
    const popup = document.querySelector('.popup'),
      btnsPopup = document.querySelectorAll('.popup-btn');

    popup.addEventListener('click', (event) => {
      let target = event.target;

      if (target.classList.contains('popup-close')) {
        popup.removeAttribute('style');
      } else {
        target = target.closest('.popup-content');

        if (!target) {
          popup.removeAttribute('style');
        }
      }


    });
    btnsPopup.forEach((item) => {
      item.addEventListener('click', () => {
        popup.querySelector('.popup-content').style.top = '-100%';
        popup.style.display = 'block';
      });
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

    // window.addEventListener('resize', () => {
    //   width = document.documentElement.clientWidth;
    //   if (width >= 768) {
    //     btnsPopup.forEach((item) => {
    //       item.addEventListener('click', () => {
    //         requestAnimationFrame();
    //       });
    //     });
    //   }
    // });

    // if (width >= 768) {
    //   btnsPopup.forEach((item) => {
    //     item.addEventListener('click', () => {
    //       requestAnimationFrame();
    //     });
    //   });
    // }
  }
  togglePopup();
  /* /PopUp */

  /* Табы */
  function toggleTabs() {
    const tabHeader = document.querySelector('.service-header'),
      tabs = tabHeader.querySelectorAll('.service-header-tab'),
      tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tabs[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tabs[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };

    tabHeader.addEventListener('click', (event) => {
      let target = event.target.closest('.service-header-tab');

      if (target) {
        tabs.forEach((item, index) => {
          if (item === target) {
            toggleTabContent(index);
          }
        });
      }
    });
  }
  toggleTabs();
  /* /Табы */

  /* Слайдер */
  function slider() {
    const container = document.querySelector('.portfolio-content'),
      slides = container.querySelectorAll('.portfolio-item'),
      dotsContainer = container.querySelector('.portfolio-dots');

    let currentSlide = 0,
        interval;

    function createDots() {
      slides.forEach((item) => {
        let dot = document.createElement('li');
        if (item === 0) {
          dot.classList.add('dot dot-active');
        } else {
          dot.classList.add('dot');
        }
        dotsContainer.append(dot);
      });
    }
    createDots();
    let dots = container.querySelectorAll('.dot');

    function prevSlide(elem, index, className) {
      elem[index].classList.remove(className);
    }

    function nextSlide(elem, index, className) {
      elem[index].classList.add(className);
    }

    function autoPlay() {
      prevSlide(slides, currentSlide, 'portfolio-item-active');
      prevSlide(dots, currentSlide, 'dot-active');

      currentSlide++;
      if (currentSlide >= slides.length) {
        currentSlide = 0;
      }

      nextSlide(slides, currentSlide, 'portfolio-item-active');
      nextSlide(dots, currentSlide, 'dot-active');
    }

    function startSlider() {
      interval = setInterval(autoPlay, 2000);
    }

    function stopSlider() {
      clearInterval(interval);
    }

    startSlider();

    container.addEventListener('mouseenter', () => {
      stopSlider();
    });

    container.addEventListener('mouseleave', () => {
      startSlider();
    });

    container.addEventListener('click', (event) => {
      event.preventDefault();
      let target = event.target;

      if (target.matches('.portfolio-btn, .dot')) {
        prevSlide(slides, currentSlide, 'portfolio-item-active');
        prevSlide(dots, currentSlide, 'dot-active');

        if (target.matches('#arrow-left')) {
          currentSlide--;
          if (currentSlide <= 0) {
            currentSlide = slides.length - 1;
          }
        } else if (target.matches('#arrow-right')) {
          currentSlide++;
          if (currentSlide >= slides.length) {
            currentSlide = 0;
          }
        } else if (target.matches('.dot')) {
          dots.forEach((item, index) => {
            if (item === target) {
              currentSlide = index;
            }
          });
        }

        nextSlide(slides, currentSlide, 'portfolio-item-active');
        nextSlide(dots, currentSlide, 'dot-active');
      }
    });
  }
  slider();
  /* /Слайдер */

  /* Смена фото */
  function changePhoto() {
    const container = document.getElementById('command');

    function exchangeSrcData(item) {
      let temp;
      temp = item.src;
      item.src = item.dataset.img;
      item.dataset.img = temp;
    }

    container.addEventListener('mouseover', (event) => {
      let target = event.target;
      if (target.matches('.command__photo')) {
        exchangeSrcData(target);
      }
    });

    container.addEventListener('mouseout', (event) => {
      let target = event.target;
      if (target.matches('.command__photo')) {
        exchangeSrcData(target);
      }
    });
  }
  changePhoto();
  /* /Смена фото */

  /* Валидация input калькулятора */
  function validationCalc() {
    const inputs = document.querySelectorAll('#calc input[type="number"]');

    inputs.forEach((item) => {
      item.addEventListener('keypress', (event) => {
        if (!event.key.match(/[\d]/)) {
          event.preventDefault();
        }
      });
    });
  }
  validationCalc();
  /* /Валидация input калькулятора */
});
