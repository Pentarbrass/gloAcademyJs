'use strict';

const timeDisplay = () => {
    const week = ['Воскресенье, ', 'Понедельник, ', 'Вторник, ', 'Среда, ',
        'Четверг, ', 'Пятница, ', 'Суббота, '];
    const month = [' января ', ' февраля ', ' марта ',
        ' апреля ', ' мая ', ' июня ',
        ' июля ', ' августа ', ' сентября ',
        ' октября ', ' ноября ', ' декабря '];
    const date = new Date();

    const addZero = elem => {
        if (String(elem).length === 1) { return '0' + elem; } else { return String(elem); }
    };
    const changeEnding = (num, timeElem = '') => {
        const textVariant = (timeElem === 'h' ? [' час ', ' часа ', ' часов '] :
            timeElem === 'm' ? [' минута ', ' минуты ', ' минут '] :
            [' секунда ', ' секунды ', ' секунд ']);
        const n = num % 10;
        return num > 4 && num < 20 ? num + textVariant[2] : 
            n === 1 ? num + textVariant[0] : 
            n > 1 && n < 5 ? num + textVariant[1] :
            num + textVariant[2];
    };

    const textTime = 'Сегодня ' + week[date.getDay()] + date.getDay() + month[date.getMonth()] + 
    date.getFullYear() + ' года, ' + changeEnding(date.getHours(), 'h') + 
    changeEnding(date.getMinutes(), 'm') + changeEnding(date.getSeconds());
    const time = addZero(date.getHours()) + ':' + addZero(date.getMinutes()) + ':' + addZero(date.getSeconds()) + ' ' + 
    addZero(date.getDay()) + '.' + addZero(date.getMonth()) + '.' + date.getFullYear();

    document.querySelector('.text-time').textContent = textTime;
    document.querySelector('.time').textContent = time;

};

let elem = document.createElement('p');
elem.classList.add('text-time');
document.body.appendChild(elem);

elem = document.createElement('p');
elem.classList.add('time');
document.body.appendChild(elem);


let start = setInterval( timeDisplay, 1000 );
setTimeout( () => { clearInterval(start); alert('Программа остановлена!'); }, 15000 );

