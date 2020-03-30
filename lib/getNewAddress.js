const bitcoin = require("bitcoinjs-lib")
import * as networkUtils from './network'

export const getNewAddress = (publicKey, network) => {
    if(network==undefined) network = networkUtils.DEFAULT_NETWORK
}
