'use strict';

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;
let income = 'development';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую')
let deposite = !!confirm('Есть ли у вас депозит в банке?');
let mission = 100000;
let period = 10;
let expenses = [];


function start() {
    do {
        money = prompt('Ваш месячний доход?');
    } while (!isNumber(money));
};

start();

function getExpensesMonth() {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
        expenses[i] = prompt('Введите обязательную статью расходов');
        let expense = prompt('Во сколько эта статья обойдется?');
        while (!isNumber(expense)) {
            expense = prompt('Введите сумму цифрами!');
        }
        sum += +expense;
    }
    return sum; 
};

let expensesAmount = getExpensesMonth();

function getAccumulatedMonth() {
    return money - expensesAmount;
};
function getTargetMonth(purpose, accumulatedMonth) {
    let targetMonth = Math.ceil(purpose / accumulatedMonth);
    if (targetMonth < 0) {
        return 'Цель не будет достигнута';
    } else {
        return 'Цель будет достигнута за ' + targetMonth + ' месяцев';
    }
};

let accumulatedMonth = getAccumulatedMonth();
let budgetDay = Math.floor(accumulatedMonth / 30);

function getStatusIncome () {
    if (budgetDay >= 1200) {
        return ('У вас высокий уровень дохода');
    } else if (budgetDay >= 600) {
        return ('У вас средний уровень дохода');
    } else if (budgetDay >= 0) {
        return ('К сожалению у вас уровень дохода ниже среднего');
    } else if (budgetDay < 0) {
        return ('Что то пошло не так');
    };
};

function showTypeOf (data) {
    console.log(data, typeof(data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposite);

console.log('Ваши расходы за месяц ' + expensesAmount);
console.log('Период равен ' + period + ' месяцам');
console.log('Цель заработать ' + mission + ' долларов');
console.log(addExpenses.toLowerCase());
console.log(addExpenses.split(', '));
console.log('Бюджет на месяц: ' + accumulatedMonth);
console.log( getTargetMonth(mission, accumulatedMonth) );
console.log('Бюджет на день: ' + budgetDay);
console.log(getStatusIncome());

