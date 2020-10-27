const n = process.argv[2];

function displayPyramid(n) { 
    for (let i = 0; i < n; i++) { 
      let str = '';
     
      for (let k = 1; k <= (i+1); k++) { 
        str = str + '#'; 
      } 
      console.log(str); 
    } 
  } 

  displayPyramid(n);