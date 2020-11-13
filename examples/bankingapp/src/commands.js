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

export const depositFunds = () => {
    console.log("Depositing funds!");
    const accountRef = validateUser();

    console.log(`How much money do you want to deposit? (Current balance is:${accountRef.balance}€.`);

    const amount = getIntInput();

    if (confirmation()) {
        accountRef.balance += amount;
        console.log(`Depositing ${amount}€. Account balance is now ${accountRef.balance}`);
    }
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
        fundRequests: [],
    };

    allUsers = allUsers.concat(account);
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

export const transferFunds = () => {
    console.log("Transfering funds");
    const accountRef = validateUser();

    console.log(`How much money do you want to transfer?
                (Current balance: ${accountRef.balance} €.`);
    
    const getAmount = (output) => {
        if (output) {
            console.log(`Unfortunately you don't have the balance to do that.
            You have ${accountRef.balance} on your account.`);
        }
        const amount = getIntInput();
        return amount >= accountRef.balance ? getAmount (true) : amount;
    }
    const amount = getAmount(false);

    console.log("Which account ID do you want to transfer these funds to?");

    const targetAccountRef = getAccount();

    if (confirmation()) {
        accountRef.balance -= amount;
        targetAccountRef.balance += amount;

        console.log(`Sending ${amount} from account ID ${accountRef.id}
                to account ID ${targetAccountRef.id}`);
    }
}
export const doesAccountExist = () => {
    console.log("Checking if the account exists!");
    console.log("Enter the ID of an account whose existence you want to verify.");
    const id = getIntInput();
    const account = allUsers.find((user) => user.id === id);
    if (account) {
        console.log("This account exists.");
    } else {
        console.log("No such account exists.");
    }
}

export const login = () => {
    if(!loggedUser) {
        console.log("Logging in");
        loggedUser = validateUser();
        console.log("You are now logged in!");
    } else {
        console.log("You are already logged in!");
    }
};

export const logout = () => {
    if (loggedUser) {
        loggedUser = null;
        console.log("Logged out");
    } else {
        console.log("You are not logged in");        
    }
};
export const changeName = () => {
    console.log("Change the name associated with your account!");

    const accountRef = validateUser();

    console.log("Which name should we change your account to?");
    accountRef.name = readline.question();
    console.log(`We will address you as ${accountRef.name} from now on.`);
};

export const requestFunds = () => {
    console.log("Requesting funds!");

    const accountRef = validateUser();
    console.log("From what account do you want to request funds?");
    const targetaccountRef = getAccount();

    console.log("Account found. How much money do you want to request?");

    const amount = getIntInput();
    const newFundRequests = [...targetaccountRef.fundRequests, {
        requestee: targetaccountRef.id,
        requester: accountRef.id,
        amount,
    }];
    targetaccountRef.fundRequests = newFundRequests;

    console.log(`Requesting ${amount}€ from the user with ID ${targetaccountRef.id}`);
};

export const fundRequests = () => {
    console.log("Listing fund requests!");

    const accountRef = validateUser();

    console.log("Listing all the requests for your account!");

    if (!accountRef.fundRequests.length) {
        console.log("You have no pending fund requests.");
        return;
    }
    accountRef.fundRequests.forEach((fundReq) => {
        console.log(` - ${fundReq.amount} for the user ${fundReq.requestee}.`);
    });
};

export const acceptFundRequest = () => {
    console.log("Accepting fund requests!");
    
    const accountRef = validateUser();

    console.log("Listing all the requests for your account!");

    if (!accountRef.fundRequests.length) {
        console.log("You have no pending fund requests.");
        return;
    }

    accountRef.fundRequests.forEach((fundReq) => {
        console.log(` - ${fundReq.amount} for the user ${fundReq.requester}.`);
    });

    console.log(`Your account balance is ${accountRef.balance}. 
    Which fund request would you like to accept?`);

    const whichToAccept = () => {
        console.log("Enter the ID for the user whose fund request you wish to accept");
        const targetId = getIntInput();
        const selectedFundRequest = accountRef.fundRequests.find((fundReq) => fundReq.requester === targetId)

        if (!selectedFundRequest) {
            console.log("No such request.");
            whichToAccept();
        }
        if (selectedFundRequest.amount > accountRef.balance) {
            console.log("You do not have funds to accept this request.");
            whichToAccept();
        }
        if (confirmation()) {
            console.log(`Accepting fund request 
                ${selectedFundRequest.amount}€ 
                from the user ${selectedFundRequest.requester}.`);
            console.log(`Transferring ${selectedFundRequest.amount}€ 
                to account ID ${selectedFundRequest.requester}.`);

            accountRef.balance -= selectedFundRequest.amount;
            const targetAccount = allUsers.find((user) => (
                user.id === selectedFundRequest.requester));
            targetAccount.balance += selectedFundRequest.amount;
            const newFundRequests = accountRef.fundRequests.filter((fundReq) => (
                fundReq !== selectedFundRequest));

            accountRef.fundRequests = newFundRequests;

            console.log(`Your acccount balance is now ${accountRef.balance}€.`);
        }
    };

    whichToAccept();
};

export const readUsersFromFile = () => {
    try {
        const data = fs.readFileSync("account_data.json", "utf8");
        allUsers = JSON.parse(data);
    } catch (e) {
        console.log("No saved data found.");
    }
};

export const saveUsersToFile = () => {
    fs.writeFile("account_data.json", JSON.stringify(allUsers), "utf8", (err) => {
        if (err) {
            console.log("Could not save accounts to file!");
        }
    });
};
