/*Tällaisen koodinkin löysin, mutta en täysin sisäistänyt sitä joten tein forilla. Ymmärrän kyllä mitä tämä tekee suurinpiirtein. Tässä on myös lisätty tuo 15-jaollisuuden tarkistus
console.log([...Array(100)].map((_,i)=>{i++;return(i%15?'':'FizzBuzz')||(i%5?'':'Buzz')||(i%3?'':'Fizz')||i;}).join('\n'));
*/

//Tässä for-lause kuitenkin.

for (let i = 1; i <= 100; i++) {
    if (i % 3 == 0 && i % 5 == 0) {
        console.log("FizzBuzz");
    } else if (i % 3 == 0) {
        console.log("Fizz");
    } else if (i % 5 == 0) {
        console.log("Buzz");
    } else {
        console.log(i);
    }
}