const arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22];
const arr2 = arr.map(x => x * 2);
const arr3 = arr.reduce((a, b) => a + b, 0);
const isDivisibleBy3 = arr => arr.filter(val => val % 3 == 0);

console.log(isDivisibleBy3(arr));
console.log(arr2);
console.log(arr3);