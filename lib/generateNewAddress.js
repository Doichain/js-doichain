const bitcoin = require('bitcoinjs-lib')

export const generateNewAddress = (publicExtendedKey, derivationPath, network) => {
    let childKey0FromXpub = bitcoin.bip32.fromBase58(publicExtendedKey);
    const derivePathToArray = derivationPath.split('/')
    const newDerivePath = derivePathToArray[2] + "/" + (derivePathToArray[3]+1)
    let address = bitcoin.payments.p2pkh({ pubkey: childKey0FromXpub.derivePath(newDerivePath).publicKey, network: global.DEFAULT_NETWORK}).address
    return address
}