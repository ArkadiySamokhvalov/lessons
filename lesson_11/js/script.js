'use strict';

let buttonStart = document.getElementById('start');
let buttons = document.getElementsByTagName('button'); 
let depositCheck = document.querySelector('#deposit-check');
let additionalIncomeItems = document.querySelectorAll('.additional_income-item');
let budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
let budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
let expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
let additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
let additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
let incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
let targetMonthValue = document.getElementsByClassName('target_month-value')[0];
let salaryAmount = document.querySelector('.salary-amount');
let incomeItems = document.querySelectorAll('.income-items');
let expensesItems = document.querySelectorAll('.expenses-items');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let depositAmount = document.querySelector('.deposit-amount');
let depositPercent = document.querySelector('.deposit-percent');
let targetAmount = document.querySelector('.target-amount');
let periodSelect = document.querySelector('.period-select');
let periodAmount = document.querySelector('.period-amount');
let placeholderNums = document.querySelectorAll('[placeholder="Сумма"]');
console.log('placeholderNums: ', placeholderNums);
let placeholderChars = document.querySelectorAll('[placeholder="Наименование"]');

function isString (value) {
    return typeof value === 'string' || value instanceof String;
}

function isNumber (value) {
    return typeof value === 'number' && isFinite(value);
}

buttonStart.setAttribute('disabled', 'disabled');

let appData = {
    money: 0,
    budgetDay: 0,
    budgetMonth: 0,
    income: {},
    addIncome: [],
    incomeMonth: 0,
    expenses: {},
    addExpenses: [],
    expensesMonth: 0,
    deposit: false,
    percentDeposit: 0,
    moneyDeposit : 0,
    getMoney() {  
        appData.money = +salaryAmount.value;
    },
    getExpenses() {
        expensesItems.forEach((item) => {
            let itemTitle = item.querySelector('.expenses-title').value;
            let itemAmount = item.querySelector('.expenses-amount').value;
            if (itemTitle !== '' && itemAmount !== '') {
                appData.expenses[itemTitle] = +itemAmount;
            }
        });
    },
    getIncome() {
        incomeItems.forEach((item) => {
            let itemTitle = item.querySelector('.income-title').value;
            let itemAmount = item.querySelector('.income-amount').value;
            if (itemTitle !== '' && itemAmount !== '') {
                appData.income[itemTitle] = +itemAmount;
            }
        });

        for (let key in appData.income) {
            appData.incomeMonth += +appData.income[key];
        }
    },
    getAddExpenses() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome() {
        additionalIncomeItems.forEach((item) => {
            let itemValue = item.value.trim();
            if(itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },
    getExpensesMonth() {
        for (let index in appData.expenses) {
            if (isNumber(appData.expenses[index])) {
                appData.expensesMonth += appData.expenses[index];
            }
        }
    },
    calcBudget() {
        appData.budgetMonth = appData.money - appData.expensesMonth + appData.incomeMonth;
        appData.budgetDay = appData.budgetMonth / 30;
    },
    calcTargetMonth() {
        return Math.ceil(targetAmount.value / appData.budgetMonth);
    },
    calcPeriod() {
        return periodSelect.value * appData.budgetMonth;
    },
    getStatusIncome() {
        return (appData.budgetDay <= 0) ? 'Что-то пошло не так' :
            (appData.budgetDay <= 600) ? 'К сожалению у вас уровень дохода ниже среднего' :
            (appData.budgetDay >= 1200) ? 'У вас высокий уровень дохода' :
            'У вас средний уровень дохода';
    },
    showResults() {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = Math.round(appData.budgetDay);
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = appData.calcTargetMonth();
        incomePeriodValue.value = appData.calcPeriod();
        periodSelect.addEventListener('input', () => {
            incomePeriodValue.value = appData.calcPeriod();
        });
    },
    addExpensesBlock() {
        let clone = expensesItems[0].cloneNode(true);
        clone.querySelector('.expenses-title').value = '';
        clone.querySelector('.expenses-amount').value = '';
        expensesItems[0].parentNode.insertBefore(clone, buttons[1]);
        expensesItems = document.querySelectorAll('.expenses-items');
        
        if (expensesItems.length === 3) {
            buttons[1].style.display = 'none';
        }
    },
    addIncomesBlock() {
        let clone = incomeItems[0].cloneNode(true);
        clone.querySelector('.income-title').value = '';
        clone.querySelector('.income-amount').value = '';
        incomeItems[0].parentNode.insertBefore(clone, buttons[0]);
        incomeItems = document.querySelectorAll('.income-items');
        
        if (incomeItems.length === 3) {
            buttons[0].style.display = 'none';
        }
    },
};

salaryAmount.addEventListener('input', () => {
    if (salaryAmount.value !== '' && isNumber(+salaryAmount.value)) {
        buttonStart.removeAttribute('disabled');
    } else {
        buttonStart.setAttribute('disabled', 'disabled');
    }
});
buttonStart.addEventListener('click', () => {
    appData.getMoney();
    appData.getIncome();
    appData.getExpenses();
    appData.getAddIncome();
    appData.getAddExpenses();
    appData.getExpensesMonth();
    appData.calcBudget();
    appData.showResults();
    console.log('Наша программа включает в себя данные:');
    for (let index in appData) {
        console.log(index, ' : ', appData[index]);
    }
});
buttons[1].addEventListener('click', appData.addExpensesBlock);
buttons[0].addEventListener('click', appData.addIncomesBlock);
periodSelect.addEventListener('input', () => {
    periodAmount.textContent = periodSelect.value;
});
// placeholderNums.forEach(placeholderNums => placeholderNums.addEventListener('input', (e) => {
//     if (e.key !== 'Backspace' || !e.key.match(/[\d]/)) {
//         e.preventDefault();
//     }
// }));
// placeholderChars.forEach(placeholderNums => placeholderNums.addEventListener('input', (e) => {
//     let reg = /[А-Яа-я.,\-!?\b]/gm;
//     if (!e.key.match(reg)) {
//         e.preventDefault();
//     }
// }));