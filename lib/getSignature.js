const bitcoin = require('bitcoinjs-lib')
const bitcoinMessage = require('bitcoinjs-message')
/**
 * Create Signature via bitcoin-js message
 * - https://medium.com/coinmonks/how-to-sign-verify-messages-with-bitcoin-flo-keys-64e6150a5879
 * - https://github.com/bitcoinjs/bitcoinjs-message
 * @param message
 * @param privateKey
 * @returns {*}
 */
const getSignature = (message,privateKey) => {
    try {
        const signature = Message(message).sign(new bitcore.PrivateKey.fromString(privateKey));
        return signature;
    } catch(exception) {
        throw {error:"Error during creating signature for doichain entry", exception: exception};
    }
};

export default getSignature;
