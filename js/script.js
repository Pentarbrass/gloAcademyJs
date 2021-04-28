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
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];

let expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items');


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

    getBudget() {
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
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

    getInfoDeposit() {
        if (this.deposit) {
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }

    changePercent() {
        const valueSelect = this.value;

        if (!valueSelect) {
            depositAmount.disabled = true;
        } else {
            depositAmount.disabled = false;
            if (valueSelect === 'other') {
                depositPercent.style.display = 'inline-block';
                depositPercent.value = '';
            } else {
                depositPercent.style.display = 'none';
                depositPercent.value = valueSelect;
            }
        }
    }
    depositHandler() {
        if (checkDeposit.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositPercent.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            depositPercent.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePercent);
        }
        this.blockStart();
    }

    check  () {
    const target = event.target;
    let tmpValue = target.value.trim();

        const changeInputNumber = () => {
            let condition = /.+/,
                textAlert;
            let validPervent = true;
            if (target.placeholder === 'Наименование') {
                condition = /^[,. а-яА-ЯёЁ]+$/;
                textAlert = 'Доупускается ввод только русских букв, пробела, точки и запятой!';
            }
            if (target.placeholder === 'Сумма') {
                condition = /^[\d.]+$/;
                textAlert = 'Доупускается ввод только цифр!';
            }
            if (target.placeholder === 'Процент') {
                condition = /^[\d.]+$/;
                textAlert = 'Введите корректное значение в поле проценты! (число от 1 до 100)';
                validPervent = (+target.value.trim() > 0) && (+target.value.trim() < 100);
            }
            if (!condition.test(target.value.trim()) && target.value.trim() || !validPervent) {
                alert(textAlert);
                target.value = tmpValue;
            }
            target.removeEventListener('change', changeInputNumber);
        };
        target.addEventListener('change', changeInputNumber);
    }
    
    blockage(disabled = true) {
        document.querySelectorAll('.data input[type=text]').forEach(item => {
            item.disabled = disabled;
        });
        checkDeposit.disabled = disabled;
        depositBank.disabled = disabled;
        incomePlus.disabled = disabled;
        expensesPlus.disabled = disabled;
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
        startButton.disabled = !salaryAmount.value.trim() || 
            (checkDeposit.checked && !(depositPercent.value.trim() && depositAmount.value.trim()));;
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

        this.blockage(false);

        incomePlus.style.display = '';
        expensesPlus.style.display = '';
        checkDeposit.checked = false;

        this.depositHandler();

        document.querySelectorAll('input[type=text]').forEach(item => {
            item.value = '';
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
        depositAmount.addEventListener('input', this.blockStart);
        depositPercent.addEventListener('input', this.blockStart);
        document.querySelectorAll('.data input').forEach(input => {
            input.addEventListener('focus', this.check);
        });
        checkDeposit.addEventListener('change', this.depositHandler.bind(this));
        depositAmount.addEventListener('focus', this.check);
        depositPercent.addEventListener('focus', this.check);
    }
    
}

const appData = new AppData();
appData.eventListeners();
