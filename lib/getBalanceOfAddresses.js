import {listTransactions} from "./listTransactions"

export const getBalanceOfAddresses = async (addressList, network) => {
    //console.log('checkking for addresses:',addressList.length)
    let transactionCount = 0
    let i = 0
    let addressObjectList = []
    let balance = 0
    for (const addr of addressList) {
        const transactions = await listTransactions(addr)
        let addressBalance = 0
        let txs = []
        if(transactions.data && transactions.data.length>0){
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
                txs.push(tx)
            })
        }
        addressObjectList.push({
            address: addr,
            balance: addressBalance,
            transactions: txs
        })
    }

    const retValue = {
        transactionCount: transactionCount,
        addresses:addressObjectList,
        balance:balance}
    return retValue
}
