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
    reset() {
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
    },
    getMoney() {  
        this.money = +salaryAmount.value;
    },
    getExpenses() {
        expensesItems.forEach((item) => {
            let itemTitle = item.querySelector('.expenses-title').value;
            let itemAmount = item.querySelector('.expenses-amount').value;
            if (itemTitle !== '' && itemAmount !== '') {
                this.expenses[itemTitle] = +itemAmount;
            }
        });
    },
    getIncome() {
        incomeItems.forEach((item) => {
            let itemTitle = item.querySelector('.income-title').value;
            let itemAmount = item.querySelector('.income-amount').value;
            if (itemTitle !== '' && itemAmount !== '') {
                this.income[itemTitle] = +itemAmount;
            }
        });

        for (let key in this.income) {
            appData.incomeMonth += +appData.income[key];
        }
    },
    getAddExpenses() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        });
    },
    getAddIncome() {
        additionalIncomeItems.forEach((item) => {
            let itemValue = item.value.trim();
            if(itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        });
    },
    getExpensesMonth() {
        for (let index in this.expenses) {
            if (isNumber(this.expenses[index])) {
                this.expensesMonth += this.expenses[index];
            }
        }
    },
    calcBudget() {
        this.budgetMonth = this.money - this.expensesMonth + this.incomeMonth;
        this.budgetDay = this.budgetMonth / 30;
    },
    calcTargetMonth() {
        return Math.ceil(targetAmount.value / this.budgetMonth);
    },
    calcPeriod() {
        return periodSelect.value * this.budgetMonth;
    },
    getStatusIncome() {
        return (this.budgetDay <= 0) ? 'Что-то пошло не так' :
            (this.budgetDay <= 600) ? 'К сожалению у вас уровень дохода ниже среднего' :
            (this.budgetDay >= 1200) ? 'У вас высокий уровень дохода' :
            'У вас средний уровень дохода';
    },
    showResults() {
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
    
    appData.reset();
    buttons[0].removeAttribute('disabled');
    buttons[1].removeAttribute('disabled');
    buttonStart.style.display = 'inline-block';
    buttonCancel.style.display = 'none';
});

buttons[0].addEventListener('click', () => {
    appData.addIncomesBlock();
    dataTypeText = document.querySelectorAll('.data [type="text"]');
    placeholderNums = document.querySelectorAll('[placeholder="Сумма"]');
    placeholderChars = document.querySelectorAll('[placeholder="Наименование"]');
});

buttons[1].addEventListener('click', () => {
    appData.addExpensesBlock();
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