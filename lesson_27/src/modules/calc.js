export default function calc(price) {
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
