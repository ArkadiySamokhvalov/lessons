function getExpensesMonth () {
  "use_strict";
  let sum = 0;
  for (let i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }

  return sum;
}

function getAccumulatedMonth (money, expenses) {
  "use_strict";
  return money - expenses;
}

function getTargetMonth  (mission, accumulatedMonth) {
  "use_strict";
  return Math.floor(mission / accumulatedMonth);
}

function getStatusIncome (budgetDay) {
  "use_strict";
  return (budgetDay <= 0) ? 'Что-то пошло не так' : 
            (budgetDay <= 600) ? 'К сожалению у вас уровень дохода ниже среднего' :
            (budgetDay >= 1200) ? 'У вас высокий уровень дохода' :
            'У вас средний уровень дохода';
}

function showTypeOf (data) {
  "use_strict";
  return typeof(data);
}