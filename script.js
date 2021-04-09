let money = 2500;
let income = 'development';
let addExpenses = 'Communal, Taxy, Products';
let deposite = true;
let mission = 100000;
let period = 10;
let budgetDay = money / 30;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposite);

console.log(addExpenses.length);

console.log('Период равен ' + period + ' месяцам');
console.log('Цель заработать ' + mission + ' долларов');

console.log(addExpenses.toLowerCase());
console.log(addExpenses.split(', '));

console.log(budgetDay);