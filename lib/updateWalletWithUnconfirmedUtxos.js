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
  /*  console.log("new old wallet transactions ",wallet.addresses[0].transactions)
    //2. take the new outputs and put it back into our wallet (adding change from last transaction as new unspent output
    const newOutputs = txResponse.txRaw.vout
    console.log(' txResponse.txRaw', txResponse.txRaw)
    console.log('newOutputs',newOutputs)
    newOutputs.forEach( out => {
        const outValue = out.value
        const outN = out.n
        const outTxid = txResponse.txRaw.txid
        out.scriptPubKey.addresses.forEach( outputAddr => {
            wallet.addresses.forEach( walletAddr => {
                if(outputAddr == walletAddr.address){
                    console.log('found our address adding transaction to it')
                    walletAddr.transactions.push({txid:outTxid, n:outN, category: 'receive', amount:outValue, fee:0, confirmations:0, senderAdress:'not yet defined', address:outputAddr})
                }
            })
        })
    })
    console.log("new  wallet transactions ",wallet.addresses[0].transactions) */
}
