let num = 266219;

output = [],
sNumber = num.toString();

for (let i = 0, len = sNumber.length; i < len; i += 1) {
    output.push(+sNumber.charAt(i));
}
console.log(output);

let total= 1;

for (let i = 0; i < output.length; ++i) {
    total *= output[i];
}
console.log(total);

total **= 3;
console.log(total);

let strTotal = total.toString();
console.log(typeof strTotal);

console.log(strTotal.substr(0, 2));


//Откровенный костыль, работу с перебором элементов массива не усвоил
