'use strict';

//Task#1
let arr = ['132566', '2954', '441223', '45221', '96634', '290056', '77500'];

for (let i = 0; i < arr.length; i++) {
    if (parseInt(arr[i][0]) === 2 || parseInt(arr[i][0]) === 4) {
        console.log(i, arr[i]);
    }
}

//Второй пункт задания
let baseArray = 100;
let primeNumbers = [];

for (let j = 2; j <= baseArray; j++) {
    let factorization = [];

    for (let i = 2; i <= j; i++) {
        if (j % i === 0) {
            factorization.push(i);
        }
    }

    if (factorization.length === 1) {
        primeNumbers.push(j);
    }
}
for (let k = 0; k < primeNumbers.length; k++) {
        console.log(primeNumbers[k] + ' Делители этого числа: 1 и ' + primeNumbers[k]);
        
    }
