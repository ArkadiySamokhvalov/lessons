'use strict';

let buttonStart = document.getElementById('start');
let buttonCancel = document.getElementById('cancel');
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
let dataTypeText = document.querySelectorAll('.data [type="text"]');
let resultTypeText = document.querySelectorAll('.result [type="text"]');
let placeholderNums = document.querySelectorAll('[placeholder="Сумма"]');
let placeholderChars = document.querySelectorAll('[placeholder="Наименование"]');

const AppData = function () {
    this.money = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.addIncome = [];
    this.incomeMonth = 0;
    this.expenses = {};
    this.addExpenses = [];
    this.expensesMonth = 0;
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    buttonStart.setAttribute('disabled', 'disabled');
};

AppData.prototype.getMoney =  function () {
    this.money = +salaryAmount.value;
};

AppData.prototype.getExpenses = function () {
    expensesItems.forEach((item) => {
        let itemTitle = item.querySelector('.expenses-title').value;
        let itemAmount = item.querySelector('.expenses-amount').value;
        if (itemTitle !== '' && itemAmount !== '') {
            this.expenses[itemTitle] = +itemAmount;
        }
    });
};

AppData.prototype.getIncome = function () {
    incomeItems.forEach((item) => {
        let itemTitle = item.querySelector('.income-title').value;
        let itemAmount = item.querySelector('.income-amount').value;
        if (itemTitle !== '' && itemAmount !== '') {
            this.income[itemTitle] = +itemAmount;
        }
    });

    for (let key in this.income) {
        this.incomeMonth += +this.income[key];
    }
};

AppData.prototype.getAddExpenses = function () {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach((item) => {
        item = item.trim();
        if (item !== '') {
            this.addExpenses.push(item);
        }
    });
};

AppData.prototype.getAddIncome = function () {
    additionalIncomeItems.forEach((item) => {
        let itemValue = item.value.trim();
        if (itemValue !== '') {
            this.addIncome.push(itemValue);
        }
    });
};

AppData.prototype.getExpensesMonth = function () {
    for (let index in this.expenses) {
        if (this.isNumber(this.expenses[index])) {
            this.expensesMonth += this.expenses[index];
        }
    }
};

AppData.prototype.calcBudget = function () {
    this.budgetMonth = this.money - this.expensesMonth + this.incomeMonth;
    this.budgetDay = this.budgetMonth / 30;
};

AppData.prototype.calcTargetMonth = function () {
    return Math.ceil(targetAmount.value / this.budgetMonth);
};

AppData.prototype.calcPeriod = function () {
    return periodSelect.value * this.budgetMonth;
};

AppData.prototype.addExpensesBlock = function () {
    let clone = expensesItems[0].cloneNode(true);
    clone.querySelector('.expenses-title').value = '';
    clone.querySelector('.expenses-amount').value = '';
    expensesItems[0].parentNode.insertBefore(clone, buttons[1]);
    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3) {
        buttons[1].style.display = 'none';
    }
};

AppData.prototype.addIncomesBlock = function () {
    let clone = incomeItems[0].cloneNode(true);
    clone.querySelector('.income-title').value = '';
    clone.querySelector('.income-amount').value = '';
    incomeItems[0].parentNode.insertBefore(clone, buttons[0]);
    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3) {
        buttons[0].style.display = 'none';
    }
};

AppData.prototype.showResults = function () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.round(this.budgetDay);
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.calcTargetMonth();
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('input', () => {
        incomePeriodValue.value = this.calcPeriod();
    });
};

AppData.prototype.reset = function () {
    this.money = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.addIncome = [];
    this.incomeMonth = 0;
    this.expenses = {};
    this.addExpenses = [];
    this.expensesMonth = 0;
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
};

AppData.prototype.isString = function (value) {
    return typeof value === 'string' || value instanceof String;
};

AppData.prototype.isNumber = function (value) {
    return typeof value === 'number' && isFinite(value);
};

AppData.prototype.eventsListeners = function () {
    salaryAmount.addEventListener('input', () => {
        if (salaryAmount.value !== '' && this.isNumber(+salaryAmount.value)) {
            buttonStart.removeAttribute('disabled');
        } else {
            buttonStart.setAttribute('disabled', 'disabled');
        }
    });

    buttonStart.addEventListener('click', () => {
        this.getMoney();
        this.getIncome();
        this.getExpenses();
        this.getAddIncome();
        this.getAddExpenses();
        this.getExpensesMonth();
        this.calcBudget();
        this.showResults();

        dataTypeText.forEach((index) => {
            index.setAttribute('disabled', 'disabled');
        });

        buttonStart.style.display = 'none';
        buttons[0].setAttribute('disabled', 'disabled');
        buttons[1].setAttribute('disabled', 'disabled');
        buttonCancel.style.display = 'inline-block';
    });

    buttonCancel.addEventListener('click', () => {
        dataTypeText.forEach((index) => {
            index.removeAttribute('disabled');
            index.value = '';
        });
        resultTypeText.forEach((index) => {
            index.value = '';
        });

        this.reset();
        buttons[0].removeAttribute('disabled');
        buttons[1].removeAttribute('disabled');
        buttonStart.style.display = 'inline-block';
        buttonCancel.style.display = 'none';
    });

    buttons[0].addEventListener('click', () => {
        this.addIncomesBlock();
        dataTypeText = document.querySelectorAll('.data [type="text"]');
        placeholderNums = document.querySelectorAll('[placeholder="Сумма"]');
        placeholderChars = document.querySelectorAll('[placeholder="Наименование"]');
    });

    buttons[1].addEventListener('click', () => {
        this.addExpensesBlock();
        dataTypeText = document.querySelectorAll('.data [type="text"]');
        placeholderNums = document.querySelectorAll('[placeholder="Сумма"]');
        placeholderChars = document.querySelectorAll('[placeholder="Наименование"]');
    });

    periodSelect.addEventListener('input', () => {
        periodAmount.textContent = periodSelect.value;
    });

    placeholderNums.forEach((placeholderNums) => {
        placeholderNums.addEventListener('keypress', (e) => {
            if (!e.key.match(/[\d]/)) {
                e.preventDefault();
            }
        });
        // placeholderNums.addEventListener('inpaste', (e) => {
        //     e.preventDefault();
        //     let regex = /[\d]/;
        //     !regex.test(e.value) ? e.value .= : ;
        // });
    });


    placeholderChars.forEach(placeholderNums => placeholderNums.addEventListener('keypress', (e) => {
        if (!e.key.match(/[А-Я,-]/gi)) {
            e.preventDefault();
        }
    }));
};


const appData = new AppData();
appData.eventsListeners();
console.log('AppData: ', appData);