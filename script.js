'use strict';

let money = +prompt('Ваш месячний доход?', 10000);
let income = 'development';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую')
let deposite = !!confirm('Есть ли у вас депозит в банке?');
let mission = 100000;
let period = 10;
let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдется?', 700);
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = +prompt('Во сколько это обойдется?', 900);
let accumulatedMonth = getAccumulatedMonth();
let missionTime = (Math.ceil(mission / accumulatedMonth));
let budgetDay = Math.floor(accumulatedMonth / 30);

    
function getExpensesMonth() {
    return amount1 + amount2;
};
function getAccumulatedMonth() {
    return money - getExpensesMonth();
};
function getTargetMonth() {
    Math.ceil(mission / accumulatedMonth);
};

let showTypeOf = function (data) {
    console.log(data, typeof(data));
};
let getStatusIncome = function () {
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

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposite);

console.log(getExpensesMonth());
console.log('Период равен ' + period + ' месяцам');
console.log('Цель заработать ' + mission + ' долларов');
console.log(addExpenses.toLowerCase());
console.log(addExpenses.split(', '));
console.log('Бюджет на месяц: ' + accumulatedMonth);
console.log('Цель будет достигнута за ' + missionTime + ' месцев(-а)');
console.log('Бюджет на день: ' + budgetDay);
console.log(getStatusIncome());

