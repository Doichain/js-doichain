import broadcastTransaction from './broadcastTransaction'
const bitcoin = require("bitcoinjs-lib")
const VERSION = 0x7100
export const sendToAddress = (keypair, destAddress, changeAddress, amount, inputsSelected, network) => {
    if(!network) network = global.DEFAULT_NETWORK
    if(inputsSelected===undefined){ //TODO get required inputs from current available transactions (confirmed / unconfirmed)
    }
    const inputs = inputsSelected
    const txb = new bitcoin.TransactionBuilder(network)
    let inputsBalance = 0
    if(inputs){
        inputs.forEach((input) => {
            inputsBalance+=input.amount
            txb.addInput(input.txid, input.n)
        })
    }
    const fee = inputs.length*180+2*34*1000

  // https://bitcoin.stackexchange.com/questions/1195/how-to-calculate-transaction-size-before-sending-legacy-non-segwit-p2pkh-p2sh
    const changeAmount = Math.round(inputsBalance*100000000-amount-fee)
    txb.addOutput(destAddress, amount)
    txb.addOutput(changeAddress, changeAmount)
    //txb.setVersion(VERSION) //use this for name transactions
    if(!Array.isArray(keypair))
        txb.sign(0, keypair)
    else{
        for(let i = 0;i<keypair.length;i++){
            console.log('signing with keypair '+i, keypair[i])
            txb.sign(i, keypair[i])
        }
    }

    try {
        const txSignedSerialized = txb.build().toHex()
        return broadcastTransaction(null,txSignedSerialized,null,null,destAddress)
    }catch (e) {
        console.log('error broadcasting transaction',e)
    }

}




