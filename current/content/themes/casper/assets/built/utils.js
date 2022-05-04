window.utils = {
    createDataSelector: (selector, value) => `[data-${selector}="${value}"]`,
    getNearBalance: async () => {
        const accountID = nearWallet.getAccountId();
        const account = await nearAPI.account(accountID);
        const balance = await account.getAccountBalance();
        return balance;
    },
    getNearAccountDetails: async ()=>{
        const accountID = nearWallet.getAccountId();
        const account = await nearAPI.account(accountID);
        const details = await account.getAccountDetails();
        return details;    
    },
    nearBalanceToFixed: (value, toFixed) => +(value / 1e24).toFixed(toFixed)
}