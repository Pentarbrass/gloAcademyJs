'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import animateScroll from './modules/animateScroll';
import tabs from './modules/tabs';
import addDot from './modules/addDot';
import slider from './modules/slider';
import setCommandImg from './modules/setCommandImg';
import validateInputs from './modules/validateInputs';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

// Таймер
countTimer('30 May 2021');
//Бургер-меню
toggleMenu();
//Модальное окно
togglePopUp();
document.querySelector('main a').addEventListener('click', animateScroll);
//Таби
tabs();
//Слайдер и добавление точек
addDot();
slider();
//Валидация и анимация картинок
validateInputs();
setCommandImg();
//Калькулятор
calc(100);
// Отправка форми
sendForm();