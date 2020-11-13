import {
    login,
    createAccount,
    withdrawFunds,
    depositFunds,
    transferFunds,
    doesAccountExist,
    changeName,
    logout,
    requestFunds,
    fundRequests,
    readUsersFromFile,
    saveUsersToFile,
    acceptFundRequest,
    
} from "./commands.js";


const actionTypes = {
    program_actions: "Program actions",
    account_actions: "Account actions",
    fund_actions: "Fund actions",
    fundRequests: "Fund requests",
}


const help = (actionlist) => {
    console.log("\nHere is the list of commands that you can use\n");

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
        command: "login",
        description:"        Log in",
        action: login,
        action_type: actionTypes.program_actions,
    },

    {
        command: "logout",
        description:"        Log out",
        action: logout,
        action_type: actionTypes.program_actions,
    },

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
        action_type: actionTypes.fund_actions,
        action: withdrawFunds,
    },

    {
        command: "deposit_funds",
        description:"        Opens a dialog to withdraw your funds from us",
        action_type: actionTypes.fund_actions,
        action: depositFunds,
    },
    {
        command: "transfer_funds",
        description:"        Opens a dialog to transfer funds",
        action_type: actionTypes.fund_actions,
        action: transferFunds,
    },
    {
        command: "does_account_exist",
        description:"        Checks if a specified account exists or not.",
        action_type: actionTypes.account_actions,
        action: doesAccountExist,
    },
    {
        command: "change_name",
        description:"        Change the name associated with your account.",
        action_type: actionTypes.account_actions,
        action: changeName,
    },

    {
        command: "request_funds",
        description:"        Request funds from another account.",
        action_type: actionTypes.fundRequests,
        action: requestFunds,
    },

    {
        command: "fund_requests",
        description:"        View your fund requests.",
        action_type: actionTypes.fundRequests,
        action: fundRequests,
    },

    {
        command: "accept_fund_request",
        description:"        Accept your fund requests.",
        action_type: actionTypes.fundRequests,
        action: acceptFundRequest,
    },
];

export default actions;
