
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
    return inputs
}
<<<<<<< HEAD
export default getUnspents
=======

 export default getUnspents
>>>>>>> 6b42e50473246c42e234b62a01d27310c0a96e2c
