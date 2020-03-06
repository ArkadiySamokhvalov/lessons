'use strict';

export default function togglePopup() {
  const popup = document.querySelector('.popup'),
    btnsPopup = document.querySelectorAll('.popup-btn'),
    popupContent = document.querySelector('.popup-content');

  // анимация появления сверху
  let count = -60;
  function animate() {
    count += 2;
    popupContent.style.top = count + '%';
    if (count < 20) {
      requestAnimationFrame(animate);
    }
  }

  // убирает popUp по клику на крестик или пространство вне модального окна
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
