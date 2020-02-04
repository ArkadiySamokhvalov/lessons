'use strict';

function isString (value) {
    return typeof value === 'string' || value instanceof String;
}

function isNumber (value) {
    return typeof value === 'number' && isFinite(value);
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
    percentDeposit: 0,
    moneyDeposit : 0,
    mission: 50000,
    period: 3,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking() {
        let index,
            cost;
        if (confirm('Есть ли у вас дополнительный источник заработка?')) {
            do {
                index = prompt('Какой у вас дополнительный заработок?');
            } while (!isString(index));
            do {
                cost = +prompt('Сколько вы на этом зарабатываете?');
            } while (!isNumber(cost));
                    
            appData.income[index] = cost;  
        }

        appData.addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую:')
            .toLowerCase().split(',');

        if (confirm('Есть ли у вас депозит в банке?')) {
            appData.deposit = true;
            do {
                appData.percentDeposit = +prompt('Какой процент депозита?');
            } while (!isNumber(appData.percentDeposit));
            do {
                appData.moneyDeposit = +prompt('Какая сумма депозита?');
            } while (!isNumber(appData.moneyDeposit));
        }

        do {
            index = prompt('Введите обязательную статью расходов:');
        } while (!isString(index));
        do {
            cost = +prompt('В сколько это обойдется?');
        } while (!isNumber(cost));
                
        appData.expenses[index] = cost;    
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
    },
    calcSavedMoney() {
        return appData.period * appData.budgetMonth;
    }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

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
console.log('calcSavedMoney: ', appData.calcSavedMoney());
console.log('appData.percentDeposit: ', appData.percentDeposit);
console.log('appData.moneyDeposit: ', appData.moneyDeposit);
console.log('', appData.addExpenses.join(', ').toUpperCase);
console.log(appData.getStatusIncome());

console.log('Наша программа включает в себя данные:');
for (let index in appData) {
    console.log(index, ' : ', appData[index]);
}