import {getBalanceOfWallet} from "./getBalanceOfWallet";
import {getAddress} from "./getAddress";

const bitcoin = require("bitcoinjs-lib")

export const createNewWallet = async (hdkey, walletIndex, email, network) => {
    if(!network) network = global.DEFAULT_NETWORK
    const chainIndex = 0
    const addressIndex = 0
    const derivationPath = "m/"+walletIndex+"/"+chainIndex+"/"+addressIndex
    const walletDerivationPath = "m/"+walletIndex
    //1 deriveKey

    let walletKey = hdkey.derive(walletDerivationPath)

    const getBalanceOfWalletObj = await getBalanceOfWallet(hdkey,derivationPath)
    if(getBalanceOfWalletObj.addresses.length===0){
        const childKey = hdkey.derive(derivationPath)
        // walletKey = hdkey.derive(walletDerivationPath)
        const address = getAddress(childKey.publicKey,network)
        getBalanceOfWalletObj.addresses = [{address:address}]
    }

    const wallet = {}
    wallet.isNew = (getBalanceOfWalletObj.transactionCount===0)
    wallet.network = network.name
    wallet.derivationPath = derivationPath
    wallet.balance = getBalanceOfWalletObj.balance
    wallet.addresses = getBalanceOfWalletObj.addresses
    wallet.senderEmail = email
    wallet.publicExtendedKey = walletKey.publicExtendedKey
    return wallet
}
