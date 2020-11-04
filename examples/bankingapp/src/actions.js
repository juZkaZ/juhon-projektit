import {
    createAccount,
    withdrawFunds,
} from "./commands.js";


const actionTypes = {
    program_actions: "Program actions",
    account_actions: "Account actions",
}


const help = (actionlist) => {
    console.log("Here is the list of commands that you can use");

    Object.values(actionTypes).forEach((type) => {
        console.log(type);
        actionlist.forEach((action) => {
            if (action.action_type === type) {
                console.log(`${action.command} ${action.description}`); 
            }
        });
        console.log("\n");
       //console.log(type);
    });
};


const actions = [
    {
        command: "help",
        description:"        Opens this dialog",
        action: () => help(actions),
        action_type: actionTypes.program_actions,
    },

    {
        command: "create_account",
        description:"        Opens a dialog to create an account",
        action_type: actionTypes.account_actions,
        action: createAccount,
    },

    {
        command: "withdraw_funds",
        description:"        Opens a dialog to withdraw your funds from us",
        action_type: actionTypes.account_actions,
        action: withdrawFunds,
    },


];

export default actions;
