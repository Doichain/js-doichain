const bitcoin = require("bitcoinjs-lib")
import * as networkUtils from './network'

export const getNewAddress = (publicKey, network) => {
    if(network==undefined) network = networkUtils.DEFAULT_NETWORK
   /* const { address } = bitcoin.payments.p2pkh({
        pubkey: publicKey,
        network: network,
    });
    return address*/
}
