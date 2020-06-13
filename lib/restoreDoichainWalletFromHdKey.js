const bitcoin = require("bitcoinjs-lib")
import {getAddress} from "./getAddress";
import {network as defaultNetwork} from "./network";
import {listTransactions} from "./listTransactions";
import {createNewWallet} from "./createNewWallet";

export const noEmailError = new TypeError('An email address is mandatory');
export const restoreDoichainWalletFromHdKey = async (hdKey, email, network) => {
    if(!network) network = global.DEFAULT_NETWORK

    let walletIndex = 0
    let chainIndex = 0
    let addressIndex = 0

    let newWallet = false
    let derivationPath
    let childKey = undefined
    const wallets = []
    while(!newWallet){
        const wallet = await createNewWallet(hdKey,walletIndex,'email_'+walletIndex,network)
        if(!wallet.isNew){
            wallets.push(wallet)
            walletIndex++;
        } else newWallet = true
    }

    return wallets
}
