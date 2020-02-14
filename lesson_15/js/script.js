'use strict';

const   buttonStart = document.getElementById('start'),
        buttons = document.getElementsByTagName('button'),
        buttonCancel = document.getElementById('cancel'),
        depositCheck = document.querySelector('#deposit-check'),
        additionalIncomeItems = document.querySelectorAll('.additional_income-item'),
        budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
        budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
        expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
        additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
        additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
        incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
        targetMonthValue = document.getElementsByClassName('target_month-value')[0],
        salaryAmount = document.querySelector('.salary-amount'),
        additionalExpensesItem = document.querySelector('.additional_expenses-item'),
        depositAmount = document.querySelector('.deposit-amount'),
        depositPercent = document.querySelector('.deposit-percent'),
        targetAmount = document.querySelector('.target-amount'),
        periodSelect = document.querySelector('.period-select'),
        periodAmount = document.querySelector('.period-amount'),
        resultTypeText = document.querySelectorAll('.result [type="text"]');

let     incomeItems = document.querySelectorAll('.income-items'),
        expensesItems = document.querySelectorAll('.expenses-items'),
        placeholderNums = document.querySelectorAll('[placeholder="Сумма"]'),
        placeholderChars = document.querySelectorAll('[placeholder="Наименование"]'),
        dataTypeText = document.querySelectorAll('.data [type="text"]');


class AppData {
    constructor() {
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
    }
    getMoney() {
        this.money = +salaryAmount.value;
    }
    getExpInc() {
        const count = (item) => {
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const itemAmount = item.querySelector(`.${startStr}-amount`).value;

            if (itemTitle !== '' && itemAmount !== '') {
                this[startStr][itemTitle] = itemAmount;
            }

            incomeItems.forEach(count);
            expensesItems.forEach(count);

            for (const key in this.income) {
                this.incomeMonth += +this.income[key];
            }
        };
    }
    getAddExpInc() {
        additionalExpensesItem.value.split(',').forEach((item) => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        });
        additionalIncomeItems.forEach((item) => {
            item = item.value.trim();
            if (item !== '') {
                this.addIncome.push(item);
            }
        });
    }
    getExpensesMonth() {
        for (let index in this.expenses) {
            if (this.isNumber(this.expenses[index])) {
                this.expensesMonth += this.expenses[index];
            }
        }
    }
    calcBudget() {
        this.budgetMonth = this.money - this.expensesMonth + this.incomeMonth;
        this.budgetDay = this.budgetMonth / 30;
    }
    calcTargetMonth() {
        return Math.ceil(targetAmount.value / this.budgetMonth);
    }
    calcPeriod() {
        return periodSelect.value * this.budgetMonth;
    }
    addBlock(name) {
        let node;
        let button;
        if (name === 'expenses') {
            node = expensesItems;
            button = buttons[1];
        }
        if (name === 'income') {
            node = incomeItems;
            button = buttons[0];
        }
        const clone = node[0].cloneNode(true);
        clone.querySelector(`.${name}-title`).value = '';
        clone.querySelector(`.${name}-amount`).value = '';
        node[0].parentNode.insertBefore(clone, button);

        const nodes = document.querySelectorAll(`.${name}-items`);
        if (nodes.length === 3) {
            button.style.display = 'none';
        }
    }
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
    }
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
    }
    isString(value) {
        return typeof value === 'string' || value instanceof String;
    }
    isNumber(value) {
        return typeof value === 'number' && isFinite(value);
    }
    eventsListeners() {
        salaryAmount.addEventListener('input', () => {
            if (salaryAmount.value !== '' && this.isNumber(+salaryAmount.value)) {
                buttonStart.removeAttribute('disabled');
            }
            else {
                buttonStart.setAttribute('disabled', 'disabled');
            }
        });
        buttonStart.addEventListener('click', () => {
            this.getMoney();
            this.getExpInc();
            this.getAddExpInc();
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
            this.addBlock('income');
            dataTypeText = document.querySelectorAll('.data [type="text"]');
            placeholderNums = document.querySelectorAll('[placeholder="Сумма"]');
            placeholderChars = document.querySelectorAll('[placeholder="Наименование"]');
        });
        buttons[1].addEventListener('click', () => {
            this.addBlock('expenses');
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
    }
}

const appData = new AppData();
appData.eventsListeners();
console.log('AppData: ', appData);