import {network as defaultNetwork} from "./network";
import {getAddress} from "./getAddress";
import {listTransactions} from "./listTransactions"
import {getBalanceOfAddresses} from "./getBalanceOfAddresses";

export const getBalanceOfWallet = async (hdkey, derivationPath, network) => {
    if(!network) network = global.DEFAULT_NETWORK
    const derivationElements = derivationPath.split('/')

    let checkVisibleAddresses = true
    let checkUnvisibleAddresses = false
    const walletNo = Number(derivationElements[1])
    let chainsNo = Number(derivationElements[2])
    let addressNo = Number(derivationElements[3])
    let gathering = (checkVisibleAddresses || checkUnvisibleAddresses)
    let balance = 0
    let addresses = []
    let transactionCount = 0
    while(gathering){

        const newDerivationPath = 'm/'+walletNo+'/'+chainsNo+'/'+addressNo
        console.log('gathering derivationPath',newDerivationPath)
        const childKey = hdkey.derive(newDerivationPath)
        const address = getAddress(childKey.publicKey,network)
        const addressesRet = await getBalanceOfAddresses([address])

        if(addressesRet && addressesRet.transactionCount>0){
            addressNo++ //incrementing to next address in this wallet
            transactionCount+=addressesRet.transactionCount
            balance+=addressesRet.balance
            addresses.push(
                {
                    address:address,
                    balance: addressesRet.balance,
                    transactions:addressesRet.addresses[0].transactions,
                    derivationPath:newDerivationPath
                }
            )
        }else{
            //console.log('no transactions')
            if(checkVisibleAddresses){
                checkVisibleAddresses=false
                checkUnvisibleAddresses=true
                chainsNo=1
                addressNo=0
            }
            else{  //unvisible (change addresses)
                checkUnvisibleAddresses=false
                chainsNo=0
                addressNo=0
            }
        }
        gathering = (checkVisibleAddresses || checkUnvisibleAddresses)
    }
    return {balance:balance, addresses: addresses, transactionCount:transactionCount}
}
