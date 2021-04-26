'use strict';
let
    startButton = document.getElementById('start'),
    cancelButton = document.getElementById('cancel'),
    incomePlus = document.getElementsByTagName('button')[0],
    expensesPlus = document.getElementsByTagName('button')[1],
    checkDeposit = document.querySelector('#deposit-check'),
    additionalIncomeItems = document.querySelectorAll('.additional_income-item'),
    additionalIncomeValue = document.getElementsByClassName('result-total')[3],
    additionalExpensesValue = document.getElementsByClassName('result-total')[4],
    incomePeriodValue = document.getElementsByClassName('result-total')[5],
    targetMonthValue = document.getElementsByClassName('result-total')[6],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeItems = document.querySelectorAll('.income-items'),
    incomeTitle = document.querySelector('.income-title'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesAmount = document.querySelector('.expenses-amount'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositePercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
const isString = function(str) {
    while (!isNaN(str || str.trim() === '' || str === null) ) {
        str = prompt('Вы ввели неверное значение! \n');
    }
    return str;
};
function inputRefresh() {
    let inputString = document.querySelectorAll('[placeholder="Наименование"]');
    let inputNumber = document.querySelectorAll('[placeholder="Сумма"]');

    inputString.forEach(el => {
        el.addEventListener('input',()=> {
        el.value = el.value.replace(/[^а-яА-Я ,.!]/,'');
        });
    });
    inputNumber.forEach(el => {
        el.addEventListener('input',()=> {
        el.value = el.value.replace(/[^0-9]/,'');
        });
    });
}
function disabledInputText() {
    let inputText = document.querySelectorAll('[type="text"]:not(.result-total)');

    inputText.forEach(element => {
    element.disabled = true;
    });
    startButton.style.display = 'none';
    cancelButton.style.display = 'block';
}

const AppData = function () {

    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
};

AppData.prototype.start = function () {
    this.budget = +salaryAmount.value;

    this.getExpenses();
    this.getIncome();
    this.getInfoDeposit();
    this.getExpensesMonth();
    this.getBudget();
    this.getAddExpenses();
    this.getAddIncome();
        
    this.showResalts();
    disabledInputText();
};
AppData.prototype.showResalts = function () {
    const _this = this;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcPeriod();

    periodSelect.addEventListener('input', function() {
        incomePeriodValue.value = _this.calcPeriodMoney();
    });
};

AppData.prototype.addIncomeBlock = function() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.querySelector('.income-title').value = '';
    cloneIncomeItem.querySelector('.income-amount').value = '';
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
        incomePlus.style.display = 'none';
    }
    inputRefresh();
};

AppData.prototype.addExpensesBlock = function () {    
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelector('.expenses-title').value = '';
    cloneExpensesItem.querySelector('.expenses-amount').value = '';
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
        expensesPlus.style.display = 'none';
    }
    inputRefresh();
};

AppData.prototype.getExpenses = function () {
    const _this = this;
    expensesItems.forEach(function (item) {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
            _this.expenses[itemExpenses] = cashExpenses;
        }
    });
};

AppData.prototype.getIncome = function () {
    const _this = this;
    incomeItems.forEach(function(item) {
        let incomeTitle = item.querySelector('.income-title').value;
        let incomeAmount = item.querySelector('.income-amount').value;

        if (incomeTitle !== '' && incomeAmount !== '') {
            _this.income[incomeTitle] = incomeAmount;
        }
    });

    for (let key in this.income) {
        this.incomeMonth += +this.income[key];
    }
};

AppData.prototype.getAddExpenses = function () {
    const _this = this;
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function (item) {
        item = item.trim();
        if (item !== '') {
            _this.addExpenses.push(item);
        }
    });
};

AppData.prototype.getAddIncome = function () {
    const _this = this;
    additionalIncomeItems.forEach(function (item) {
        let itemValue = item.value.trim();
        if (itemValue !== '') {
            _this.addIncome.push(itemValue);
        }
    });
};

AppData.prototype.getExpensesMonth = function() {
    let sum = 0;   
    for (let key in this.expenses) {
        sum += +this.expenses[key];
    }
    this.expensesMonth = sum;
};

AppData.prototype.getBudget = function() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
};

AppData.prototype.getAccumulatedMonth = function() {
    return this.budget - this.getExpensesMonth();
};

AppData.prototype.getTargetMonth = function() {
    if (this.budgetMonth <= 0) {
        console.log('Цель не будет достигнута');
    } else {
        return Math.ceil(targetAmount.value / this.budgetMonth);
    }
};


AppData.prototype.getInfoDeposit = function () {
    if (this.deposit) {
        this.percentDeposit = prompt('Какой годовой процент?', '10');
        while (!isNumber(this.percentDeposit) || this.percentDeposit < 0) {
            this.percentDeposit = prompt('Какая ставка в процентах у Вашего депозита?', '10');
        }
        this.moneyDeposit = print('Какая сумма заложена?', 10000);
        while (!isNumber(this.moneyDeposit) || this.moneyDeposit < 0) {
            this.moneyDeposit = prompt('Сколько денег у Вас на депозите?', 10000);
        }
    }
};

AppData.prototype.calcPeriodMoney = function() {
    return (+this.budgetMonth) * +periodSelect.value;
};
    
AppData.prototype.changlePeriodSelect = function() {
    periodAmount.textContent = periodSelect.value;
    incomePeriodValue.value = this.calcPeriodMoney();
};

AppData.prototype.calcPeriod = function () {
    return this.budgetMonth * periodSelect.value;
};
AppData.prototype.blockStart = function () {
    startButton.disabled = !salaryAmount.value.trim();
};

AppData.prototype.reset = function () {
    
    let inputText = document.querySelectorAll('[type="text"]:not(.result-total)');
    let inputAll = document.querySelectorAll('input:not(.period-select)');
    startButton.disabled = false;

    inputAll.forEach(element => {
        element.value = '';
    });

    inputText.forEach(element => {
        element.disabled = false;
    });

    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;

    startButton.style.display = 'block';
    cancelButton.style.display = 'none';
    periodSelect.value = 1;
    periodAmount.textContent = periodSelect.value;
    incomeItems.forEach((element, i) => {
        if (i !== 0) {
            element.remove();
        }
    });
    incomePlus.style.display = 'block';

    expensesItems.forEach((element, i) => {
        if (i !== 0) {
            element.remove();
        }
    });
    expensesPlus.style.display = 'block';
};
AppData.prototype.blockStart();
AppData.prototype.eventListeners = function () {
    startButton.addEventListener('click', this.start.bind(this));
    cancelButton.addEventListener('click', this.reset.bind(this));
    expensesPlus.addEventListener('click', this.addExpensesBlock);
    incomePlus.addEventListener('click', this.addIncomeBlock);
    periodSelect.addEventListener('input', this.changlePeriodSelect.bind(this));
    salaryAmount.addEventListener('input', this.blockStart);
};

const appData = new AppData();
appData.eventListeners();
console.log(appData);