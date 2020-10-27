const numb1 = process.argv[2];
const numb2 = process.argv[3];
const c = process.argv[4];

if (numb1 > numb2) { 
    console.log ("number 1 is greater");
} else if (numb1 < numb2) {
    console.log ("number 2 is greater");
} else if(numb1 === numb2 && c === "Hello World!"){
    console.log ("yay you guessed the password");
};

