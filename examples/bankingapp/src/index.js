import readline from "readline-sync";
import actions from "./actions.js";
import { readUsersFromFile, saveUsersToFile } from "./commands.js";


readUsersFromFile();
console.log("Welcome to Buutti banking app CLI!");
console.log("You can get help by typing 'help'.");

let running = true;
while (running) {
    const prompt = readline.question();

    if (prompt === "quit") {
    saveUsersToFile();
    running = false;
    } else {
        const act = actions.find((action) => action.command === prompt);
        if (act) {
            act.action();
        } else {
            console.log(`Command not '${prompt}' does not exist
            (Type 'help' for a list of commands).`);
        }
    }
};