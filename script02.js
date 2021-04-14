'use strict';


//Task#1
let lang = 'en';
let ruWeek = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
let engWeek = ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'];

// Sub#1
if (lang === 'ru') {
    console.log(ruWeek);
}
if (lang === 'en') {
    console.log(engWeek);
}

// Sub#2
switch (lang) {
    case 'ru': 
        console.log(ruWeek);
        break;
    case 'en': 
        console.log(engWeek);
        break;
}

// Sub#3
let week = {
    'ru': ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'],
    'en': ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'],
};
console.log(week[lang]);


//Task#2
let namePerson = 'Дима';

console.log(namePerson.toLowerCase() === 'артем' ? 'директор' : namePerson.toLowerCase() === 'максим' ? 'преподаватель' : 'студент');