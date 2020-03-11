const bitcoin = require("bitcoinjs-lib")

export const getAddress = (publicKey, network) => {
    const { address } = bitcoin.payments.p2pkh({
        pubkey: publicKey,
        network: network,
    });
    return address
}



