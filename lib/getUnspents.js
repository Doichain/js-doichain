
export const getUnspents = (wallet) => {
    const inputs = []
    wallet.addresses.forEach((addr) => addr.transactions.forEach(tx => {
        console.log('checking tx',tx)
        if(tx.category==='receive' && tx.spent===undefined)
            inputs.push(tx)
    }))

    console.log('collected '+inputs.length+" inputs")
    return inputs
}
