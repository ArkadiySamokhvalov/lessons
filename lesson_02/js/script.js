let money = 1000, 
    income = 'Грабеж и разбой', 
    addExpenses = 'Крем от загара, панамка, солнцезащитные очки';
    deposit = true, 
    mission = 10000, 
    period = 10;


console.log('money: ', money);
console.log('income: ', income);
console.log('deposit: ', deposit);
console.log('addExpenses length: ', addExpenses.length);
console.log('Период равен ', period, ' месяцев');
console.log('Цель заработать ', mission, ' ракушек');
console.log('Массив: ', addExpenses.toUpperCase().split(','));

let budgetDay = money / 30;
console.log('budgetDay: ', budgetDay);

