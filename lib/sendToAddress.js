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
    const changeAmount = (inputsBalance*100000000)-amount-fee
    txb.addOutput(destAddress, amount)
    console.log('destAddress:'+destAddress,amount)
    txb.addOutput(changeAddress, changeAmount)
    console.log('changeAddress:'+changeAddress,amount)
    //txb.setVersion(VERSION)
    txb.sign(0, keypair)

    try {
        const txSignedSerialized = txb.build().toHex()
        return broadcastTransaction(null,txSignedSerialized,null,null)
    }catch (e) {
        console.log('error broadcasting transaction',e)
    }

}




