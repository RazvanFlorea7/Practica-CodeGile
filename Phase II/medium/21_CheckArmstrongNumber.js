function isArmstrongNumber(num) {
    const numStr = num.toString();
    const n = numStr.length;

    let sum = 0;
    for (let digit of numStr) {
        sum += Math.pow(parseInt(digit), n);
    }

    return sum === num;
}

const number = 153;
console.log(`${number} is an Armstrong number: ${isArmstrongNumber(number)}`); // Output: true

const anotherNumber = 123;
console.log(`${anotherNumber} is an Armstrong number: ${isArmstrongNumber(anotherNumber)}`); // Output: false
