
export const getUnspents = (wallet) => {
    const inputs = []
    wallet.addresses.forEach((addr) => addr.transactions.forEach(tx => {
       // console.log('checking tx',tx)
        if(tx.category==='receive' && tx.spent===undefined)
        {
            console.log('using as input ',tx)
            inputs.push(tx)
        }
    }))

    console.log('collected '+inputs.length+" inputs")
    return inputs
}
