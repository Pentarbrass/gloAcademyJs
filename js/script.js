'use strict';
const
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
    incomeTitle = document.querySelector('.income-title'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesAmount = document.querySelector('.expenses-amount'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositePercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];

let expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items');

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

class AppData {
    constructor() {
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
    }

    start () {
        this.budget = +salaryAmount.value;

        this.getExpInc();
        this.getInfoDeposit();
        this.getExpensesMonth();
        this.getBudget();
        this.getAddExpInc();

        this.showResalts();
        disabledInputText();
    }
    showResalts () {
        const _this = this;
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcPeriod();

        periodSelect.addEventListener('input', function () {
            incomePeriodValue.value = _this.calcPeriodMoney();
        });
    }

    addBlock() {
        const target = event.target;
        const startStr = target.parentNode.className;
        const cloneItem = document.querySelector(`.${startStr}-items`).cloneNode(true);
        cloneItem.querySelector(`.${startStr}-title`).value = '';
        cloneItem.querySelector(`.${startStr}-amount`).value = '';
        target.parentNode.insertBefore(cloneItem, target);
        if (document.querySelectorAll(`.${startStr}-items`).length === 3) {
            target.style.display = 'none';
        }
        inputRefresh();
    }
        
    getExpInc() {
        const count = item => {
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const itemAmount = item.querySelector(`.${startStr}-amount`).value;
            if (itemTitle !== '' && itemAmount !== '') {
                this[startStr][itemTitle] = itemAmount;
            }
        };

        incomeItems.forEach(count);
        expensesItems.forEach(count);

        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    }

    getAddExpInc() {
        const additionalExpensesItems = additionalExpensesItem.value.split(',');

        const pushArray = ( item, array ) => {
            const itemValue = item.trim();
            if ( itemValue !== '' ) {
                this[array].push( itemValue );
            }
        };

        additionalIncomeItems.forEach( item => {
            pushArray( item.value, 'addIncome' );
        } );

        additionalExpensesItems.forEach( item => {
            pushArray( item, 'addExpenses' );
        } );
    }

    getExpensesMonth () {
        let sum = 0;
        for (let key in this.expenses) {
            sum += +this.expenses[key];
        }
        this.expensesMonth = sum;
    }

    getBudget () {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }

    getAccumulatedMonth () {
        return this.budget - this.getExpensesMonth();
    }

    getTargetMonth () {
        if (this.budgetMonth <= 0) {
            console.log('Цель не будет достигнута');
        } else {
            return Math.ceil(targetAmount.value / this.budgetMonth);
        }
    }

    getInfoDeposit () {
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
    }
    check  () {
    let tmpValue = event.target.value.trim();
    const target = event.target;

    const changeInputNumber = event => {
        let condition = /.+/;
        if (target.placeholder === 'Наименование') {
            condition = /^[,. а-яА-ЯёЁ]+$/;
            
        }
        if (target.placeholder === 'Сумма') {
            condition = /^[\d]+$/;
        }
        if (!condition.test(target.value.trim()) && target.value.trim() !== '') {
            target.value = tmpValue;
            target.removeEventListener('change', changeInputNumber);
        }
        tmpValue = target.value.trim();
    };
    target.addEventListener('change', changeInputNumber);
}

    calcPeriodMoney () {
        return (+this.budgetMonth) * +periodSelect.value;
    }
    
    changlePeriodSelect () {
        periodAmount.textContent = periodSelect.value;
        incomePeriodValue.value = this.calcPeriodMoney();
    }

    calcPeriod () {
        return this.budgetMonth * periodSelect.value;
    }
    blockStart () {
        startButton.disabled = !salaryAmount.value.trim();
    }

    reset () {
    
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

        const excessRemoval = item => {
        for (let i = item.length - 1; i > 0; i--) {
            item[0].parentNode.removeChild(item[i]);
        }
        };
        excessRemoval(document.querySelectorAll('.income-items'));
        excessRemoval(document.querySelectorAll('.expenses-items'));

    }
    
    eventListeners() {
        this.blockStart();
        startButton.addEventListener('click', this.start.bind(this));
        cancelButton.addEventListener('click', this.reset.bind(this));
        expensesPlus.addEventListener('click', this.addBlock);
        incomePlus.addEventListener('click', this.addBlock);
        periodSelect.addEventListener('input', this.changlePeriodSelect.bind(this));
        salaryAmount.addEventListener('input', this.blockStart);
        document.querySelectorAll('.data input').forEach(input => {
        input.addEventListener('focus', this.check);
        });
    }
    
}

const appData = new AppData();
appData.eventListeners();
console.log(appData);