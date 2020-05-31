const bitcoin = require('bitcoinjs-lib')

export const generateNewKeyPairFromHdKey = (hdKey, derivationPath, network) => {
    if(!network) network = global.DEFAULT_NETWORK
   // let childKey0FromXpub = bitcoin.bip32.fromBase58(publicExtendedKey);
    const derivePathToArray = derivationPath.split('/')
    const newDerivationPath = derivePathToArray[0] + "/" + (derivePathToArray[1]+1)
    const keyPair = hdKey.derive(newDerivationPath)
    console.log(keyPair)
    return keyPair
    //return bitcoin.payments.p2pkh({ pubkey: childKey0FromXpub.derivePath(newDerivationPath).publicKey, network: network})
}

export default generateNewKeyPairFromHdKey
