'use strict';

function toString(string) {
    if (typeof(string) !== 'string') {
        alert ('Внимание! Не верное знаение функции toString()!');
        return;
    } else {
        string = string.replace(/ /g, '');
    }
    if (string.length > 30) {
        string = string.substring(0, 30)+'...';
    }
    return string;
};

console.log(toString('Этот текст должен быть достаточно длинным, что бы увидеть как работает функция!'));