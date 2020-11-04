import readline from "readline-sync";
import * as fs from "fs";
import { userInfo } from "os";
//kaikki käyttäjät on oletusarvoisesti tyhjä Array, jonne tallennetaan luodut käyttäjät
let allUsers = [];
// oletusarvoisena yksikään olemassaoleva käyttäjä ei ole kirjautunut, kun ohjelma käynnistyy.
let loggedUser = null;

//funktio, jolla määritellään, että käyttäjän syöttämä vastaus voi olla vain numeroita.
const getIntInput = () => {
    const prompt = parseInt(readline.question(">>"), 10);
    return Number.isNaN(prompt) ? getIntInput() : prompt;
};

//funktio, joka generoi sattumanvaraisen id:n ja tarkistaa, että kenelläkään muulla ei ole samaa id:tä käytössä
const createId = () => {
    const id = Math.floor(Math.random() * 10000);
    const found = allUsers.find((user) => user.id === id);
    return found ? createId() : id;
}

export const createAccount = () => {
    console.log("Creating a new user account!");
    console.log("Can you please tell me your name?");

    const name = readline.question();

    console.log(`Welcome ${name}! It's nice to have you as our client!`);
    console.log("How much is your initial deposit? (10 e is the minimum)");
    let balance = 0;
    do {
        balance = getIntInput();
        if (balance < 10) {
            console.log("Unfortunately we can't open an account for such a small account. Do you have any more cash with you?");
        }
    } while (balance < 10);

    console.log(`Great, ${name}! You now have an account with balance of ${balance}€.`);
    console.log("We're happy to have you as a customer and we want to ensure that your money is safe with us.");
    console.log("Give us a password, which gives only you the access to your account.");

    const newPassword = readline.question();
    const newId = createId();

    console.log("Your account is now created");
    console.log(`Account id: ${newId}`);
    console.log("Store your account ID in a safe place.");

    const account = {
        name,
        password: newPassword,
        id: newId,
        balance,
    };

    allUsers = allUsers.concat(account);
    console.log(allUsers);
};

/*export const readUsersFromFile = () => {
    try {
        const data =
    }
};*/