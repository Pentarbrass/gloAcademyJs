"use strict";

const body = document.querySelector('body');
const booksPage = document.querySelector('.books');
const books = document.querySelectorAll('.book');
const adv = document.querySelector('.adv');
const bookSecondLiElems = books[0].querySelectorAll('li');
const bookThrirdName = books[4].querySelector('[target = "_blank"]');
const bookFifthLiElems = books[5].querySelectorAll('li');
const bookSixthLiElems = books[2].querySelectorAll('li');
const bookSixthUlElem = books[2].querySelector('ul');

//Восстановление порядка книг
books[0].before(books[1]);
books[0].after(books[4]);
books[4].after(books[3]);
books[5].after(books[2]);

//Изменение картинки фона
body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

//Исправление заголовка третьей книги
bookThrirdName.textContent = 'Книга 3. this и Прототипы Объектов';

//Удаление рекламы
adv.remove();

//Порядок книг во второй книге
bookSecondLiElems[10].before(bookSecondLiElems[2]);
bookSecondLiElems[3].after(bookSecondLiElems[6]);
bookSecondLiElems[6].after(bookSecondLiElems[8]);

//Порядок книг в пятой книге
bookFifthLiElems[4].after(bookFifthLiElems[2]);
bookFifthLiElems[1].after(bookFifthLiElems[9]);
bookFifthLiElems[8].before(bookFifthLiElems[5]);

//Добавление элемента в восьмую книгу
const newElem = document.createElement('li');
newElem.textContent = 'Глава 8: За пределами ES6';
bookSixthLiElems[8].after(newElem);