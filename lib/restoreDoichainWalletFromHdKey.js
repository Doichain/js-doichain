import {getAddress} from "./getAddress";
import {network as defaultNetwork} from "./network";
import {listTransactions} from "./listTransactions";
import {getBalanceOfWallet} from "./getBalanceOfWallet";
import {createNewWallet} from "./createNewWallet";

export const noEmailError = new TypeError('An email address is mandatory');
export const restoreDoichainWalletFromHdKey = async (hdkey, email, network) => {
    if(!network) network = global.DEFAULT_NETWORK

    let walletIndex = 0
    let chainIndex = 0
    let addressIndex = 0

    let newWallet = false
    let derivationPath
    let childKey = undefined
    const wallets = []
    while(!newWallet){
        const wallet = await createNewWallet(hdkey,walletIndex,'email_'+walletIndex)
        //console.log('wallet',wallet)
        if(!wallet.isNew){
            wallets.push(wallet)
            walletIndex++;
        } else newWallet = true
    }

    return wallets
}
