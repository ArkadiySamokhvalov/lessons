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
      btnsPopup = document.querySelectorAll('.popup-btn'),
      popupContent = document.querySelector('.popup-content');

    let count = -60;

    function animate() {
      count += 2;
      popupContent.style.top = count + '%';
      if (count < 20) {
        requestAnimationFrame(animate);
      }
    }

    popup.addEventListener('click', (event) => {
      let target = event.target;

      if (target.classList.contains('popup-close')) {
        popup.removeAttribute('style');
        count = -60;
      } else {
        target = target.closest('.popup-content');
        if (!target) {
          popup.removeAttribute('style');
          count = -60;
        }
      }
    });

    btnsPopup.forEach((item) => {
      item.addEventListener('click', () => {
        popup.querySelector('.popup-content').style.top = '-100%';
        popup.style.display = 'block';
        requestAnimationFrame(animate);
      });
    });
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

  /* Валидация полей */
  // Валидация калькулятора
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
  // /Валидация калькулятора

  // Валидация форм
  function validationForms() {
    const formPhone = document.querySelectorAll('.form-phone'),
      formText = document.querySelectorAll('.form-name, mess');

    formPhone.forEach((item) => {
      item.addEventListener('keypress', (event) => {
        if (!event.key.match(/[\d\+]/)) {
          event.preventDefault();
        }
      });
    });

    formText.forEach((item) => {
      item.addEventListener('keypress', (event) => {
        if (!event.key.match(/[а-я\s]/i)) {
          event.preventDefault();
        }
      });
    });
  }
  validationForms();
  // /Валидация форм
  /* /Валидация полей */

  /* калькулятор */
  function calc(price) {
    const container = document.querySelector('.calc-block'),
      calcType = container.querySelector('.calc-type'),
      calcSquare = container.querySelector('.calc-square'),
      calcDay = container.querySelector('.calc-day'),
      calcCount = container.querySelector('.calc-count'),
      totalValue = container.querySelector('#total');

    function countSum() {
      let total = 0,
        countValue = 1,
        dayValue = 1;
      const typeValue = calcType.options[calcType.selectedIndex].value,
        squareValue = +calcSquare.value;

      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }

      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }

      if (typeValue && squareValue) {
        total = price * typeValue * squareValue * countValue * dayValue;
      }

      let i = 1;
      let int = setInterval(() => {
        if (i <= total) {
          totalValue.textContent = i;
        } else {
          clearInterval(int);
        }
        i++;
      }, 17);
    }

    container.addEventListener('change', (event) => {
      let target = event.target;

      if (target === calcType || target === calcSquare || target === calcDay || target === calcCount) {
        countSum();
      }
    });
  }

  calc(100);
  /* /калькулятор */

  /* Отправка формы ajax */
  function sendForm() {
    const errorMessage = '../images/icons/cross.png',
      loadMessage = '../images/icons/refresh.png',
      successMessage = '../images/icons/tick.png';

    const forms = document.querySelectorAll('form');
    const statusMessage = document.createElement('img');

    const postData = (body) => {
      return fetch('./server.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
    };

    let i = 0,
      animation = '';
    const rotateAnimate = () => {
      if (statusMessage.classList.contains('rotate')) {
        i += 1;
        statusMessage.style.transform = `rotate(${i}deg)`;
        requestAnimationFrame(rotateAnimate);
      } else {
        statusMessage.style.transform = 'rotate(0deg)';
        cancelAnimationFrame(animation);
      }
    };

    forms.forEach((item) => {
      item.addEventListener('submit', (event) => {
        event.preventDefault();

        item.appendChild(statusMessage);
        statusMessage.src = loadMessage;
        statusMessage.classList.add('rotate');
        animation = requestAnimationFrame(rotateAnimate);

        const formData = new FormData(item);
        let body = {};

        formData.forEach((value, key) => {
          body[key] = value;
        });

        postData(body)
          .then((response) => {
            if (response.status !== 200) {
              throw new Error('status network is not 200');
            }
            console.log(response);
            statusMessage.classList.remove('rotate');
            statusMessage.src = successMessage;
          })
          .catch((error) => {
            statusMessage.classList.remove('rotate');
            statusMessage.src = errorMessage;
            console.log(error);
          });
      });
    });
  }
  sendForm();
  /* /Отправка формы ajax */
});