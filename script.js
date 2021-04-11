'use strict';

let money = +prompt('Ваш месячний доход?');
let income = 'development';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую')
let deposite = !!confirm('Есть ли у вас депозит в банке?');
let mission = 100000;
let period = 10;
let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = +prompt('Во сколько это обойдется?');
let budgetMonth = (money - (amount1 + amount2));
let missionTime = (Math.ceil(mission / budgetMonth));
let budgetDay = Math.floor(budgetMonth / 30);


console.log(typeof money);
console.log(typeof income);
console.log(typeof deposite);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцам');
console.log('Цель заработать ' + mission + ' долларов');

console.log(addExpenses.toLowerCase());
console.log(addExpenses.split(', '));

console.log('Бюджет на месяц: ' + budgetMonth);
console.log('Цель будет достигнута за ' + missionTime + ' месцев(-а)');
console.log('Бюджет на день: ' + budgetDay);
if (budgetDay >= 1200) {
    console.log('У вас высокий уровень дохода');
} else if (budgetDay >= 600) {
    console.log('У вас средний уровень дохода');
} else if (budgetDay >= 0) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDay < 0) {
    console.log('Что то пошло не так');
}