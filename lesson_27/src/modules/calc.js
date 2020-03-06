'use strict';

export default function calc(price) {
  const container = document.querySelector('.calc-block'),
    calcType = container.querySelector('.calc-type'),
    calcSquare = container.querySelector('.calc-square'),
    calcDay = container.querySelector('.calc-day'),
    calcCount = container.querySelector('.calc-count'),
    totalValue = container.querySelector('#total');

  // подсчёт результата
  function countSum() {
    let animation = '';
    let total = 0,
      countValue = 1,
      dayValue = 1,
      k = 0;

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

    // анимация цифр в поле результата
    animation = requestAnimationFrame(function animateSum() {
      if (k <= total) {
        let whole = Math.floor(total / 10),
            remainder = total % 10;

        if (k === (total - remainder)) {
          k += remainder;
        } else {
          k += whole;
        }

        totalValue.textContent = k;
        requestAnimationFrame(animateSum);
      }
    });
  }

  container.addEventListener('change', (event) => {
    let target = event.target;

    if (target === calcType || target === calcSquare || target === calcDay || target === calcCount) {
      countSum();
    }
  });
}