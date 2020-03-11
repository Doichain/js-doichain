import {getAddress} from "./getAddress";
import {DEFAULT_NETWORK} from "./network";

export const noEmailError = new TypeError('An email address is mandatory');


export const createDoichainWalletFromHdKey = (hdkey,email,network) => {
    if(!network)network = DEFAULT_NETWORK
    if(!email) throw noEmailError

    let walletIndex = 0
    let chainIndex = 0
    let addressIndex = 0

    let newAddress = false
    let derivationPath
    let childKey = undefined

    while(!newAddress){
        derivationPath = "m/"+walletIndex+"/"+chainIndex+"/"+addressIndex //TODO use
        //1 deriveKey
        childKey = hdkey.derive(derivationPath)
        //2. getAddress for network
        const address = getAddress(childKey.publicKey,network)
        //3. getTransaction of address
        const transactions = undefined //TODO check on the blockchain if there are transactions if so move to next wallet
        if(transactions === undefined) newAddress = address
        else walletIndex++ //try next wallet
    }

    const wallet = {}
    wallet.network = network
    wallet.addresses = [{address: newAddress, derivationPath:derivationPath}]
    wallet.senderEmail = email
    wallet.privateKey = childKey.privateKey.toString("hex")
    wallet.publicKey = childKey.publicKey.toString("hex")

    //console.log('created wallet', wallet)
    return wallet
}
