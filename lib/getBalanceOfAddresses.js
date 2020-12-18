import {listTransactions} from "./listTransactions"

export const getBalanceOfAddresses = async (addressList, options) => {
    options && options.network?network=options.network:network=global.DEFAULT_NETWORK

    let transactionCount = 0
    let i = 0
    let addressObjectList = []
    let balance = 0
    for (const addr of addressList) {
        const transactions = await listTransactions(addr,options)
        let addressBalance = 0
        let txs = []
        if(transactions.data && transactions.data.length>0){
            transactionCount+=transactions.data.length
            transactions.data.forEach((tx)=>{
                if(tx.category==='receive'){
                    addressBalance = addressBalance + Number(tx.amount)
                    balance = balance + Number(tx.amount?tx.amount:0)
                }
                if(tx.category==='send') {
                    addressBalance = addressBalance + Number(tx.amount) + Number(tx.fee)
                    balance = balance + Number(tx.amount?tx.amount:0) + Number(tx.fee?tx.fee:0)
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
