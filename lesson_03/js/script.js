'use_strict';

let money = +prompt('Ваш месячный доход?'),
    income = 'Грабеж и разбой', 
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую:'),
    deposit = confirm('Есть ли у вас депозит в банке?'), 
    expenses1 = prompt('Введите обязательную статью расходов:'),
    amount1 = +prompt('Во сколько это обойдется?'),
    expenses2 = prompt('Введите обязательную статью расходов:'),
    amount2 = +prompt('Во сколько это обойдется?'),
    budgetMonth = money - amount1 - amount2,
    budgetDay = budgetMonth / 30,
    mission = 1000000, 
    period = 10;

console.log('Месячный доход: ', money);
console.log('income: ', income);
console.log('Наличие депозита: ', deposit);
console.log('Период равен ', period, ' месяцев');
console.log('Цель заработать ', mission, ' ракушек');
console.log('Возможные расходы: ', addExpenses.toUpperCase().split(','));
console.log('Цель будет достигнута через ', Math.floor(mission/budgetMonth), ' месяцев');
console.log('Бюджет на месяц: ', Math.ceil(budgetMonth));
console.log('Бюджет на день: ', Math.ceil(budgetDay));
console.log((budgetDay <= 0) ? 'Что-то пошло не так' : 
            (budgetDay <= 600) ? 'К сожалению у вас уровень дохода ниже среднего' :
            (budgetDay >= 1200) ? 'У вас высокий уровень дохода' :
            'У вас средний уровень дохода');