import * as fs from "fs";
import readline from "readline-sync";
import { createInterface } from "readline";

let answer = readline.question("Welcome to banking CLI! ");
if (answer == "help") {
    const readFile = fs.readFileSync("./src/help.txt", "utf-8");
    console.log(readFile)
    answer = readline.question("What would you like to do?: ");  
};

if (answer == "create_account") {
    console.log("So you want to create a new account!");
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    
    rl.question("Let’s start with the easy question. What is your name?", (name) => {
        console.log(`Hey ${name}, It’s create to have you as a client.`);
        rl.question(`How much cash do you want to deposit to get started with your account? (10€ is the minimum)`, (cash) => {
            if (cash <= 8) {
                console.log("Unfortunately we can’t open an account for such a small account.");
            }else
            console.log(`Great ${name}, You now have an account and ${cash}e`);
            
            rl.close();
        });
        
    });
    
    rl.on("close", () => {
        console.log("\nBYE BYE !!!");
        process.exit(0);
    });
    
    
};

