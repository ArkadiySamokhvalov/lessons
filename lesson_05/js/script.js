'use_strict';

let money = start(),
    income = 'Грабеж и разбой', 
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую:'),
    expensesMonth = getExpensesMonth(),
    deposit = confirm('Есть ли у вас депозит в банке?'), 
    mission = 1000000, 
    period = 10;

let accumulatedMonth  = getAccumulatedMonth(money, expensesMonth),
budgetDay = accumulatedMonth / 30;

console.log(showTypeOf(money));
console.log(showTypeOf(income));
console.log(showTypeOf(deposit));
console.log('Расходы за месяц : ',  expensesMonth);
console.log('Возможные расходы: ', addExpenses.toUpperCase().split(','));
if (getTargetMonth(mission, accumulatedMonth)) {
    console.log('Цель будет достигнута через ', getTargetMonth(mission, accumulatedMonth), ' месяцев')
} else {
    console.log('Цель не будет достигнута');
}
console.log('Цель будет достигнута через ', getTargetMonth(mission, accumulatedMonth), ' месяцев'),
console.log('Бюджет на день: ', budgetDay);
console.log(getStatusIncome(budgetDay));