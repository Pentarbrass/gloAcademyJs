'use strict';
//A
const culcButton = document.getElementById('start');
//B
const incomeAddButton = document.getElementsByTagName('button')[0];
const expensesAddButton = document.getElementsByTagName('button')[1];
//C
const checkDeposit = document.querySelector('#deposit-check');
//D
const additionalIncomeItems = document.querySelectorAll('.additional_income-item');
//E
const budgetDayValue = document.getElementsByClassName('result-total')[1];
const expensesMonthValue = document.getElementsByClassName('result-total')[2];
const additionalIncomeValue = document.getElementsByClassName('result-total')[3];
const additionalExpensesValue = document.getElementsByClassName('result-total')[4];
const incomePeriodValue = document.getElementsByClassName('result-total')[5];
const targetMonthValue = document.getElementsByClassName('result-total')[6];
//F
const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('.income-title');
const incomeAmount = document.querySelector('.income-amount');
const expensesTitle = document.querySelector('.expenses-title');
const expensesAmount = document.querySelector('.expenses-amount');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const depositAmount = document.querySelector('.deposit-amount');
const depositePercent = document.querySelector('.deposit-percent');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
const budgetMonthValue = document.querySelector('.budget_month-value');

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
const isString = function(str) {
    while (!isNaN(str || str.trim() === '' || str === null) ) {
        str = prompt('Вы ввели неверное значение! \n');
    }
    return str;
};

let money;
function start() {
    do {
        money = prompt('Ваш месячний доход?');
    } while (!isNumber(money));
};

start();

let appData = {
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 50000,
    period: 10,
    

    asking: function() {

        if (confirm('Есть ли у вас дополнительный зароботок?')) {
            let itemIncome = prompt('Какой у вас дополнительный зароботок?', 'Таксую');
            itemIncome = isString(itemIncome);
            let cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
            while (!isNumber(cashIncome) || cashIncome < 0) {
                cashIncome = prompt('Сколько Вы на этом зарабатываете?', 10000);
            }
            appData.income[itemIncome] = cashIncome;
        }

        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = !!confirm('Есть ли у вас депозит в банке?');

        for (let i = 0; i < 2; i++) {
            let expenseName = prompt('Введите обязательную статью расходов');
            expenseName = isString(expenseName);
            let expenseValue = prompt('Во сколько эта статья обойдется?');
            while (!isNumber(expenseValue)) {
                expenseValue = prompt('Во сколько эта статья обойдется?');
            }
            appData.expenses[expenseName] = +expenseValue;
        }
    },

    getExpensesMonth: function() {
        let sum = 0;
        for (let item in appData.expenses) {
            sum += appData.expenses[item];
        }
        appData.expensesMonth = sum;
    },

    getBudget: function() {
        let budgetMonth = appData.budget - appData.expensesMonth;
        let budgetDay = Math.floor(budgetMonth / 30);
        appData.budgetMonth = budgetMonth;
        appData.budgetDay = budgetDay;
    },

    getAccumulatedMonth: function() {
        return money - appData.getExpensesMonth();
    },

    getTargetMonth: function() {
        if (appData.budgetMonth <= 0) {
            console.log('Цель не будет достигнута');
        } else {
            let targetMonth = Math.ceil(appData.mission / appData.budgetMonth);
            console.log('Цель будет достигнута за ' + targetMonth + ' месяцев');
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

    calcSavedMoney: function () {
        return appData.budgetMonth * appData.period;
    }
};

appData.asking();
appData.getInfoDeposit();
appData.getExpensesMonth();
appData.getBudget();

console.log('expensesMonth: ', appData.expensesMonth);

appData.getTargetMonth();
appData.getStatusIncome();

console.log( 'Наша программа включает в себя данные: ');
for (let item in appData) {
    console.log('Свойство: ', item, ' Значение: ', appData[item]);
}

let newStr = appData.addExpenses;
newStr.forEach((item, i) => {
    let res;
    item = item.trim();
    res = item.replace(item[0], item[0].toUpperCase());
    newStr[i] = res;
});
console.log(newStr.join(', '));
