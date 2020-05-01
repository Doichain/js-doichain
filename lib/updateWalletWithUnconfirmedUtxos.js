export const updateWalletWithUnconfirmedUtxos = (txResponse, wallet) => {
    //1. take the spend input from response and mark it in our wallet as spent
    const ourOldInputs = txResponse.txRaw.vin
    wallet.addresses.forEach( addr => addr.transactions.forEach( atx => {
        console.log("atx",atx)
        ourOldInputs.forEach(oldInputTx => {
            console.log("oldInputTx.txid",oldInputTx.txid)
            if(atx.txid===oldInputTx.txid){
                atx.spent = true
                console.log('found tx - setting it as spent',atx)
            }
        })
    }))
}
