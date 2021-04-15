'use strict';

let date = new Date();
let currentDay = date.getDay() - 1;
let week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
let body = document.querySelector('body');

for (let item in week) {
    let paragraph = document.createElement('p');
    paragraph.textContent = week[item];
    if (week[item] === 'Суббота' || week[item] === 'Воскресенье') {
        paragraph.style.fontStyle = 'italic';
    }
    if (+item === currentDay) {
        paragraph.style.fontWeight = 'bold';
    }
    body.appendChild(paragraph);
}
