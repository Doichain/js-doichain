const bitcoin = require("bitcoinjs-lib")
import * as networkUtils from './network'
const VERSION = 0x7100
export const sendToAddress = (keypair, destAddress, changeAddress, amount, inputsSelected, network) => {
    if(network===undefined) network = networkUtils.DEFAULT_NETWORK
    if(inputsSelected===undefined){ //TODO get required inputs from current available transactions (confirmed / unconfirmed)

    }
    const txb = new bitcoin.TransactionBuilder(network)
    let inputsBalance = 0
    if(inputs){
        inputs.forEach((input) => {
            inputsBalance+=input.amount
            txb.addInput(input.txid, input.n)
        })
    }
    const fee = inputs.length*180+2*34+10
    console.log('fee',fee)
  // https://bitcoin.stackexchange.com/questions/1195/how-to-calculate-transaction-size-before-sending-legacy-non-segwit-p2pkh-p2sh

    const changeAmount = inputsBalance-amount-fee
    txb.addOutput(destAddress, amount)
    txb.addOutput(changeAddress, changeAmount)
    txb.setVersion(VERSION)
    txb.sign(0, keypair)
    const txSignedSerialized = txb.build().toHex()

    broadcastTransaction(null,txSignedSerialized,null,null)
}




