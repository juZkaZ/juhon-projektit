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

const getAccount = (output = "") => {
    if (output) {
        console.log(output);
    }
    const id = getIntInput();
    const found = allUsers.find((user) => user.id === id);
    return !found ? getAccount("Unfortunately an account with that ID does not exist.") : found;
};

//salasanan kysely

const validatePassword = (accountRef) => {
    const password = readline.question(">>");
    
    if (accountRef.password === password) {
        console.log(`Correct password. We validated you as ${accountRef.name}.`);
        return true;
    }
    console.log("Wrong password, try typing it again.");
    return validatePassword();
}

const validateUser = () => {
    if (!loggedUser) {
        console.log("What is your account ID?");
        const accountRef = getAccount();
        console.log("Account found! Insert your password.");
        validatePassword(accountRef);
        return (accountRef);
    }

    return (loggedUser);
};
//Kysyy käyttäjältä vahvistuksen ja validoi onko käyttäjän vastaus kyllä vai ei.
const confirmation = () => {
    console.log("Are you sure?");
    const answer = readline.question(">>");

    if (answer === "yes") return true;
    if (answer === "no") return false;

    console.log("Please type 'yes' or 'no'");
    return confirmation();
};

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

export const withdrawFunds = () => {
    console.log("Withdrawing cash!");
    const accountRef = validateUser();

    console.log(`How much money you want to withdraw?
        (Current balance: ${accountRef.balance}€)`);
    const getAmount = (output) => {
        if (output) {
            console.log (`Unfortunately you don't have the balance for that.
                You have ${accountRef.balance}on your account.)`);
        }
        const amount = getIntInput();
        return amount <= accountRef.balance ? amount : getAmount(true);
    };
    const mAmount = getAmount(false);

    if (confirmation()) {
        accountRef.balance -= mAmount;
        console.log(`Withdrawing a cash sum of ${mAmount}€.
        Your account balance is now ${accountRef.balance}€.`);
    };
};

/*export const readUsersFromFile = () => {
    try {
        const data =
    }
};*/