'use_strict';

// let money = +prompt('Ваш месячный доход?'),
//     income = 'Грабеж и разбой', 
//     addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую:'),
//     deposit = confirm('Есть ли у вас депозит в банке?'), 
//     expenses1 = prompt('Введите обязательную статью расходов:'),
//     amount1 = +prompt('Во сколько это обойдется?'),
//     expenses2 = prompt('Введите обязательную статью расходов:'),
//     amount2 = +prompt('Во сколько это обойдется?'),
//     mission = 1000000, 
//     period = 10;

money = 1000, 
    income = 'Грабеж и разбой', 
    addExpenses = 'Крем от загара, панамка, солнцезащитные очки';
    deposit = true, 
    mission = 10000, 
    period = 10,
    amount1 = 100,
    amount2 = 500;

let accumulatedMonth  = getAccumulatedMonth(money, getExpensesMonth()),
budgetDay = accumulatedMonth / 30;

console.log(showTypeOf(money));
console.log(showTypeOf(income));
console.log(showTypeOf(deposit));
console.log('Расходы за месяц : ',  getExpensesMonth(amount1, amount2));
console.log('Возможные расходы: ', addExpenses.toUpperCase().split(','));
console.log('Цель будет достигнута через ', getTargetMonth(mission, accumulatedMonth), ' месяцев'),
console.log('Бюджет на день: ', budgetDay);
console.log(getStatusIncome(budgetDay));