import bip39 from 'bip39'

export const generateMnemonic = () => {
    const bip39 = require("bip39")
    const mnemonic = bip39.generateMnemonic()
    return mnemonic
}
