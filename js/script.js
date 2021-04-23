'use strict';
let
    start = document.getElementById('start'),
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

let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    
    start: function () {

        appData.budget = +salaryAmount.value;
        appData.getExpenses();
        appData.getIncome();
        appData.getInfoDeposit();
        appData.getExpensesMonth();
        appData.getBudget();
        appData.getAddExpenses();
        appData.getAddIncome();
        
        appData.showResalts();
        
    },

    showResalts: function () {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = appData.getTargetMonth();
        incomePeriodValue.value = appData.calcPeriod();

        periodSelect.addEventListener('input', function() {
            incomePeriodValue.value = appData.calcSavedMoney();
        });
    },

    addIncomeBlock: function() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.querySelector('.income-title').value = '';
        cloneIncomeItem.querySelector('.income-amount').value = '';
        incomeItems[0].before(cloneIncomeItem);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    },

    addExpensesBlock: function () {
        
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.querySelector('.expenses-title').value = '';
        cloneExpensesItem.querySelector('.expenses-amount').value = '';
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    },

    getExpenses: function () {
        expensesItems.forEach(function (item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },

    getIncome: function() {
        incomeItems.forEach(function(item) {
            let incomeTitle = item.querySelector('.income-title').value;
            let incomeAmount = item.querySelector('.income-amount').value;

            if (incomeTitle !== '' && incomeAmount !== '') {
                appData.income[incomeTitle] = incomeAmount;
            }
        });

        for (let item in appData.income) {
            appData.additionalIncome += +appData.income[item];
        }
    },

    getAddExpenses: function () {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },

    getAddIncome: function () {
        additionalIncomeItems.forEach(function (item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },

    getExpensesMonth: function() {
        let sum = 0;
        for (let item in appData.expenses) {
            sum += appData.expenses[item];
        }
        appData.expensesMonth = sum;
    },

    getBudget: function() {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },

    getAccumulatedMonth: function() {
        return appData.budget - appData.getExpensesMonth();
    },

    getTargetMonth: function() {
        if (appData.budgetMonth <= 0) {
            console.log('Цель не будет достигнута');
        } else {
            return Math.ceil(targetAmount.value / appData.budgetMonth);
        }
    },

    getStatusIncome: function() {
        if (appData.budgetDay >= 1200) {
            return ('У вас высокий уровень дохода');
        } else if (appData.budgetDay >= 600) {
            return ('У вас средний уровень дохода');
        } else if (appData.budgetDay >= 0) {
            return ('К сожалению у вас уровень дохода ниже среднего');
        } else if (appData.budgetDay < 0) {
            return ('Что то пошло не так');
        }
    },

    getInfoDeposit: function () {
        if (appData.deposit) {
            appData.percentDeposit = prompt('Какой годовой процент?', '10');
            while (!isNumber(appData.percentDeposit) || appData.percentDeposit < 0) {
                appData.percentDeposit = prompt('Какая ставка в процентах у Вашего депозита?', '10');
            }
            appData.moneyDeposit = print('Какая сумма заложена?', 10000);
            while (!isNumber(appData.moneyDeposit) || appData.moneyDeposit < 0) {
                appData.moneyDeposit = prompt('Сколько денег у Вас на депозите?', 10000);
            }
        }
    },

    calcPeriodMoney: function() {
        return (+appData.budgetMonth) * +periodSelect.value;
    },
    
    changlePeriodSelect: function() {
        periodAmount.textContent = periodSelect.value;
        incomePeriodValue.value = appData.calcPeriodMoney();
    },

    calcPeriod: function () {
        return appData.budgetMonth * periodSelect.value;
    },
    blockStart: function () {
        start.disabled = !salaryAmount.value.trim();
    }
};

inputRefresh();

appData.blockStart();
start.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.changlePeriodSelect);
salaryAmount.addEventListener('input', appData.blockStart);



appData.getTargetMonth();
appData.getStatusIncome();

// console.log( 'Наша программа включает в себя данные: ');
// for (let item in appData) {
//     console.log('Свойство: ', item, ' Значение: ', appData[item]);
// }

// let newStr = appData.addExpenses;
// newStr.forEach((item, i) => {
//     let res;
//     item = item.trim();
//     res = item.replace(item[0], item[0].toUpperCase());
//     newStr[i] = res;
// });
// console.log(newStr.join(', '));
