'use_strict';

function start() {
  let money;

  do {
    money = +prompt('Ваш месячный доход?');
  } while (!isNumber(money));

  return money;
}

function isNumber (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function getExpensesMonth () {
  let sum = 0,
      expenses = [],
      amount;
  for (let i = 0; i < 2; i++) {
    expenses[i] = prompt('Введите обязательную статью расходов:');
    if (isNumber(amount = +prompt('В сколько это обойдется?'))) {
      sum += amount;
    }
  }

  console.log(expenses);
  return sum;
}

function getAccumulatedMonth (money, expenses) {
  return money - expenses;
}

function getTargetMonth  (mission, accumulatedMonth) {
  return Math.floor(mission / accumulatedMonth);
}

function getStatusIncome (budgetDay) {
  return (budgetDay <= 0) ? 'Что-то пошло не так' : 
            (budgetDay <= 600) ? 'К сожалению у вас уровень дохода ниже среднего' :
            (budgetDay >= 1200) ? 'У вас высокий уровень дохода' :
            'У вас средний уровень дохода';
}

function showTypeOf (data) {
  return typeof(data);
}