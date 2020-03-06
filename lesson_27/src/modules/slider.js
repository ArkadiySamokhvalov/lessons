'use strict';

export default function slider() {
  const container = document.querySelector('.portfolio-content'),
    slides = container.querySelectorAll('.portfolio-item'),
    dotsContainer = container.querySelector('.portfolio-dots');

  let currentSlide = 0,
    interval;

  // создание точек-преходов на слайды
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

  // автоматическая прокрутка слайдов
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
