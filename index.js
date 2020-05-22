import * as network from './lib/network'
import * as getAddress from './lib/getAddress'
import {createHdKeyFromMnemonic} from "./lib/createHdKeyFromMnemonic"
import {restoreDoichainWalletFromHdKey} from "./lib/restoreDoichainWalletFromHdKey"
import {listTransactions} from "./lib/listTransactions"
import {listUnspent} from "./lib/listUnspent"
import {getBalanceOfWallet} from "./lib/getBalanceOfWallet"
import {getBalanceOfAddresses} from "./lib/getBalanceOfAddresses"
import {sendToAddress} from "./lib/sendToAddress"
import {getUnspents} from "./lib/getUnspents"
import {encryptAES} from "./lib/encryptAES"
import {decryptAES} from "./lib/decryptAES"
import {updateWalletWithUnconfirmedUtxos} from "./lib/updateWalletWithUnconfirmedUtxos"
import createAndSendTransaction from "./lib/createAndSendTransaction";

export {network,
    getAddress,
    createHdKeyFromMnemonic,
    restoreDoichainWalletFromHdKey,
    listTransactions,
    listUnspent,
    getBalanceOfAddresses,
    getBalanceOfWallet,
    decryptAES,
    encryptAES,
    getUnspents,
    sendToAddress,
    updateWalletWithUnconfirmedUtxos,
    createAndSendTransaction
}
