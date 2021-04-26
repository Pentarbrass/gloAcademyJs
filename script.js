'use strict';

const body = document.querySelector('body');
function DomElement(selector, height, width, bg, fontSize, position='static') {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
    this.position = position;
}

function move(evt)  {
    const div = document.querySelector('.block');
    let left = parseInt(div.style.left);
    let top = parseInt(div.style.top);
    if (!isNaN(div.style.left)) {
        left = 0;
    } 
    if (!isNaN(div.style.top)) {
        top = 0;
    } 
    if (evt.keyCode === 37) {
        left += -10;
        div.style.left = left + 'px';  
    } else if (evt.keyCode === 38) {
        top += -10;
        div.style.top = top + 'px';
    } else if (evt.keyCode === 39) {
        left += +10;
        div.style.left = left + 'px';
    } else if (evt.keyCode === 40) {
        top += 10;
        div.style.top = top + 'px';
    }
}

DomElement.prototype.construct = function() {
    let newElement;
    if (this.selector[0] === '.') {
        newElement = document.createElement('div');
        newElement.classList.add('block');
    } else if (this.selector[0] === '#') {
        newElement = document.createElement('p');
        newElement.id = ('best');
    }
    
    newElement.style.cssText = `
        height:  ${this.height}px;
        width:  ${this.width}px;
        background:  ${this.bg};
        font-size:  ${this.fontSize}px;
        position: ${this.position};
    `;
    newElement.textContent = 'Hello every one!';
    body.append(newElement);
    document.addEventListener('keydown', move);
};

document.addEventListener('DOMContentLoaded', function() {
    let newDomSquare = new DomElement('.id', 100, 100, 'gold', 15, 'absolute');
    newDomSquare.construct();
});
