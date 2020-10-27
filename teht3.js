const n = process.argv[2];

function findSum(n) {
    let result = 0;
    for(let i = 1; i <= n; i++) {
      result = result + i;
    }
    return result
  }
  
 
  console.log(`Sum of numbers from 1 to ${n} is ${findSum(n)}`)