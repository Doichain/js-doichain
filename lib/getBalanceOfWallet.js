import {network as defaultNetwork} from "./network";
import {getAddress} from "./getAddress";
import {listTransactions} from "./listTransactions"

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
        //console.log('newDerivationPath '+network.name,newDerivationPath)
        const childKey = hdkey.derive(newDerivationPath)
        const address = getAddress(childKey.publicKey,network)
        const transactions = await listTransactions(address)
        let addressBalance = 0

        //console.log('transactions: '+address+" on "+network.name,transactions)
        if(transactions.data && transactions.data.length>0){
            //console.log('transactions: '+address,transactions.data)
            addressNo++
            transactionCount+=transactions.data.length
            transactions.data.forEach((tx)=>{
                if(tx.category==='receive'){
                    addressBalance = addressBalance + Number(tx.amount)
                    balance = balance + Number(tx.amount)
                }
                if(tx.category==='sent') {
                    addressBalance = addressBalance - Number(tx.amount)
                    balance = balance - Number(tx.amount)
                }
                addresses.push(
                    {
                        address:address,
                        balance: addressBalance,
                        transactions:transactions.data,
                        derivationPath:newDerivationPath
                    }
                )
            })
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
