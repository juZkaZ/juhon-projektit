const numb1 = process.argv[2];
const numb2 = process.argv[3];

if (numb1 > numb2) { 
    console.log ("number 1 is greater");
} else if (numb1 < numb2) {
    console.log ("number 2 is greater");
} else {
    console.log ("numbers are equal");
}