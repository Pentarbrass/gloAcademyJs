'use strict';

const body = document.querySelector('body');
function DomElement(selector, height, width, bg, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
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
    `;
    newElement.textContent = 'Hello every one!';
    body.append(newElement);
    console.log('newElement: ', newElement);
};

let newDomElements = new DomElement('.id', 100, 300, 'gold', 36);
newDomElements.construct();

let newDomElements2 = new DomElement('#id', 200, 200, 'olive', 24);
newDomElements2.construct();