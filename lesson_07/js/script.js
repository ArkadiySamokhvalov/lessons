'use strict';

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function start() {
    let money;

    do {
        money = +prompt('Ваш месячный доход?');
    } while (!isNumber(money));

    return money;
}

let appData = {
    money: start(),
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 3,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking() {
        appData.addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую:')
            .toLowerCase().split(',');

        appData.deposit = confirm('Есть ли у вас депозит в банке?');

        for (let i = 0; i < 2; i++) {
            appData.expenses[prompt('Введите обязательную статью расходов:')] = +prompt('В сколько это обойдется?');
        }
    },
    getExpensesMonth() {
        for (let index in appData.expenses) {
            if (isNumber(appData.expenses[index])) {
                appData.expensesMonth += appData.expenses[index];
            }
        }
    },
    getBudget() {
        appData.budgetMonth = appData.money - appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth / 30;
    },
    getTargetMonth() {
        return Math.floor(appData.mission / appData.budgetMonth);
    },
    getStatusIncome() {
        return (appData.budgetDay <= 0) ? 'Что-то пошло не так' :
            (appData.budgetDay <= 600) ? 'К сожалению у вас уровень дохода ниже среднего' :
            (appData.budgetDay >= 1200) ? 'У вас высокий уровень дохода' :
            'У вас средний уровень дохода';
    }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();

console.log('Месячный доход: ', appData.money);
console.log('Депозит: ', appData.deposit);
console.log('Цель: ', appData.mission);
console.log('Период: ', appData.period);
console.log('Возможные расходы: ', appData.expenses);
console.log('Бюджет на день: ', appData.budgetDay);

console.log('Расходы за месяц : ', appData.expensesMonth);
console.log('Возможные расходы: ', appData.addExpenses);

if (appData.getTargetMonth()) {
    console.log('Цель будет достигнута через ', appData.getTargetMonth(), ' месяцев');
} else {
    console.log('Цель не будет достигнута');
}

console.log(appData.getStatusIncome());

console.log('Наша программа включает в себя данные:');
for (let index in appData) {
    console.log(index, ' : ', appData[index]);
}