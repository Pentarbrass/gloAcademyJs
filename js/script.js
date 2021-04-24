'use strict';

let change = document.querySelector('#change');
let color = document.querySelector('#color');

function getRandomColor() {
    let letters = '0123456789ABCDEF',
        color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

function setBodyColor() {
    let newColor = getRandomColor();
    document.body.style.backgroundColor = newColor;
    color.textContent = newColor;
};

change.addEventListener('click', setBodyColor);