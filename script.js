'use strict';
const date = new Date(),
    days = [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота'
    ],
    hours = date.getHours(),
    day = days[date.getDay()],
    time = date.toLocaleTimeString('ru'),
    newDate = new Date(new Date().getFullYear() + 1, 0, 1);

const greeting = document.createElement('p'),
    dayOfWeek = document.createElement('p'),
    currentTime = document.createElement('p'),
    newYearDays = document.createElement('p');

const changeEnding = (num) => {
    const textVariant = [' день', ' дня', ' дней'];
    const n1 = num % 100,
        n2 = num % 10;
    return n1 > 4 && n1 < 21 ? num + textVariant[2] :
        n2 === 1 ? num + textVariant[0] :
        n2 > 1 && n2 < 5 ? num + textVariant[1] :
        num + textVariant[2];
};


greeting.textContent = hours < 5 || hours > 22 ? 'Доброй ночи' :
    hours < 10 ? 'Доброе утро' :
    hours < 17 ? 'Добрый день' :
    'Добрый вечер';
dayOfWeek.textContent = 'Сегодня: ' + day;
currentTime.textContent = 'Текущее время: ' + time;
newYearDays.textContent = 'До нового года осталось ' + 
    changeEnding(Math.ceil((newDate.getTime() - date.getTime()) / 1000 / 60 / 60 / 24));

document.body.append(greeting, dayOfWeek, currentTime, newYearDays);
