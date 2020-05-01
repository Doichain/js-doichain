import chai from 'chai'
const bitcoin = require('bitcoinjs-lib')

chai.Assertion.addProperty('uppercase', function () {
    var obj = this._obj;
    new chai.Assertion(obj).to.be.a('string');

    this.assert(
        obj === obj.toUpperCase() // adapt as needed
        , 'expected #{this} to be all uppercase'    // error message when fail for normal
        , 'expected #{this} to not be all uppercase'  // error message when fail for negated
    );
});
import {generateMnemonic} from '../lib/generateMnemonic'
import {validateMnemonic} from "../lib/validateMnemonic";
import {createHdKeyFromMnemonic} from "../lib/createHdKeyFromMnemonic"
import {restoreDoichainWalletFromHdKey, noEmailError} from "../lib/restoreDoichainWalletFromHdKey"
import {getAddress} from "../lib/getAddress"
import {changeNetwork, DEFAULT_NETWORK, DOICHAIN_REGTEST, DOICHAIN_TESTNET, DOICHAIN} from "../lib/network"
import {fundWallet} from "../lib/fundWallet";
import {listTransactions} from "../lib/listTransactions"
import {listUnspent} from "../lib/listUnspent";
import {getBalanceOfWallet} from "../lib/getBalanceOfWallet";
import {getBalanceOfAddresses} from "../lib/getBalanceOfAddresses"
import {createNewWallet} from "../lib/createNewWallet";
import {encryptAES} from "../lib/encryptAES";
import {decryptAES} from "../lib/decryptAES";
import {generateNewAddress} from '../lib/generateNewAddress';
import {sendToAddress} from "../lib/sendToAddress"
import {getUnspents} from "../lib/getUnspents"
import {updateWalletWithUnconfirmedUtxos} from "../lib/updateWalletWithUnconfirmedUtxos"


const MNEMONIC = "refuse brush romance together undo document tortoise life equal trash sun ask"
const MNEMONIC2 = "balance blanket camp festival party robot social stairs noodle piano copy drastic"
const PASSWORD = "julianAssange2020"

describe('js-doichain', function () {
    this.timeout(0);
    describe('basic doichain functions', function () {

        it('should create a new mnemonic seed phrase', function () {
            const mnemonic = generateMnemonic()
            chai.assert.equal(mnemonic.split(' ').length, 12, 'mnemonic doesnt contain 12 words')
        })

        it('should validate a mnemonic seed phrase', function () {
            const valid = validateMnemonic(MNEMONIC)
            chai.assert.equal(valid, true, "mnomnic seed phrase not valid")
        })

        it('should create a hdkey from a mnemonic without password', function () {
            const hdKey = createHdKeyFromMnemonic(MNEMONIC)
            chai.expect(hdKey).to.have.own.property('_privateKey');
            chai.expect(hdKey).to.have.own.property('_publicKey');
        })

        //TODO this doesn't create a wallet
        it('should restore new Doichain wallet from a seed in mainnet', async function () {
            changeNetwork('mainnet')
            const hdKey = createHdKeyFromMnemonic(MNEMONIC)
            // chai.expect(() => createDoichainWalletFromHdKey(hdKey)).to.throw();
            // chai.expect(() => createDoichainWalletFromHdKey(hdKey,'alice@ci-doichain.org')).to.not.throw();
            //const xpubMaster = bitcoin.bip32.fromBase58(hdKey.publicExtendedKey)
            const wallets = await restoreDoichainWalletFromHdKey(hdKey, 'alice@ci-doichain.org')
            const newWallet = await createNewWallet(hdKey, wallets.length)
            chai.assert.strictEqual(newWallet.addresses[0].address.startsWith('M') || newWallet.addresses[0].address.startsWith('N'),true)
            chai.expect(newWallet.addresses[0].address).to.have.length(34)
            chai.expect(newWallet.addresses[0].address.substring(0,1)).to.be.uppercase
        })

        //TODO this doesn't create a wallet
        it('should create a new Doichain wallet from a seed in testnet', async function () {
            changeNetwork('testnet')
            const hdKey = createHdKeyFromMnemonic(MNEMONIC)
            const wallets = await restoreDoichainWalletFromHdKey(hdKey, 'alice@ci-doichain.org', DOICHAIN_TESTNET)
            const newWallet = await createNewWallet(hdKey, wallets.length)
            chai.assert.strictEqual(newWallet.addresses[0].address.startsWith('m') || newWallet.addresses[0].address.startsWith('n'),true)
            chai.expect(wallet.addresses[0].address).to.have.length(34)
            chai.expect(wallet.addresses[0].address.substring(0,1)).to.not.be.uppercase
        })

        it.only('should fund the basic regtest wallet with 10 DOI ', async () => {
            changeNetwork('regtest')
            const hdKey = createHdKeyFromMnemonic(MNEMONIC)
            const xpubMaster = bitcoin.bip32.fromBase58(hdKey.publicExtendedKey)

            const wallets = await restoreDoichainWalletFromHdKey(hdKey, 'alice@ci-doichain.org', DOICHAIN_REGTEST)
            const newWallet = await createNewWallet(hdKey, wallets.length)

            chai.assert.strictEqual(newWallet.addresses[0].address.startsWith('m') || newWallet.addresses[0].address.startsWith('n'), true)
            chai.expect(newWallet.addresses[0].address).to.have.length(34)
            chai.expect(newWallet.addresses[0].address.substring(0, 1)).to.not.be.uppercase

            const balanceObj = await getBalanceOfWallet(xpubMaster, 'm/0/0/0')

            console.log('balanceObj.balance',balanceObj)
            if(balanceObj.balance<5){
                     const doi = 10
                     console.log("first address",balanceObj.addresses[0].address)
                     const funding = await fundWallet(balanceObj.addresses[0].address, doi)
                     console.log('funding',funding)
                     chai.assert.notEqual(funding.status, "fail", "blockchain problem")
                     const address = funding.data.address
                     chai.expect(address).to.have.length(34)
                     chai.expect(address.substring(0, 1)).to.not.be.uppercase
                     await setTimeout(async function () {
                         const balanceObj2 = await getBalanceOfWallet(xpubMaster, 'm/0/0/0')
                         chai.assert.isAtLeast(balanceObj2.balance, 10, "should be at least 1")
                     }, 3000)
            }
        })

        it('should check the full balance of a wallets addresses', async () => {
            changeNetwork('regtest')
            const hdKey = createHdKeyFromMnemonic(MNEMONIC)
            const wallets = await restoreDoichainWalletFromHdKey(hdKey, 'alice@ci-doichain.org')
            const addressesOfFirstWallet = wallets[0].addresses
            const firstAddressOfFirstWallet = addressesOfFirstWallet[0].address
            chai.assert.isAbove(addressesOfFirstWallet.length, 0, "wallet doesn't have any address with funding")
            const balanceRet = await getBalanceOfAddresses([firstAddressOfFirstWallet])
            chai.assert.isAtLeast(balanceRet.balance, 1, "should be at least 1")

            const addressesOfSecondWallet = wallets[0].addresses
            const firstAddressOfSecondWallet = addressesOfSecondWallet[0].address
            const balanceRet2 = await getBalanceOfAddresses([firstAddressOfSecondWallet])
            chai.assert.isAtLeast(balanceRet2.balance, 1, "should be at least 1")

            const balanceRet3 = await getBalanceOfAddresses([firstAddressOfFirstWallet, firstAddressOfSecondWallet])
            chai.assert.isAtLeast(balanceRet3.balance, 2, "should be at least 1")
        })

        it('encrypt and decrypt seed phrase', function () {
            const encryptedSeedPhrase = encryptAES(MNEMONIC2, PASSWORD)
            chai.assert.isAbove(encryptedSeedPhrase.length, 0, "seed phrase not encrypted")
            const decryptedSeedPhrase = decryptAES(encryptedSeedPhrase, PASSWORD)
            chai.assert.equal(decryptedSeedPhrase, MNEMONIC2, "seed phrase not decrypted")
            const decryptedSeedPhrase2 = decryptAES(encryptedSeedPhrase, "wrongPassword")
            chai.assert.notEqual(decryptedSeedPhrase2, MNEMONIC2, "this is completely impossible")
            chai.assert.equal(decryptedSeedPhrase2, "", "this is not empty")
        })

        it('creates a master key and generates a address from it ', async function () {
            changeNetwork('regtest')
            const hdKey = createHdKeyFromMnemonic(MNEMONIC)

            const newWallet = await createNewWallet(hdKey, 0)
            chai.expect(newWallet).to.have.own.property('publicExtendedKey')

            const address = generateNewAddress(newWallet.publicExtendedKey,
                newWallet.addresses[newWallet.addresses.length - 1].derivationPath)
            chai.expect(address).to.have.length(34)
        })

        it('should generate a new Doichain address and import it', async () => {
            changeNetwork('regtest')
            const mnemonicAlice = generateMnemonic()
            const hdKeyAlice = createHdKeyFromMnemonic(mnemonicAlice)
            const childKey = hdKeyAlice.derive("m/0/0/0")
            const address = getAddress(childKey.publicKey)
            console.log('address', address)
            chai.expect(address.substring(0, 1)).to.not.be.uppercase
        })

        it('should send Doicoins to another address', async () => {
            changeNetwork('regtest')
            const mnemonicAlice = generateMnemonic()
            const hdKeyAlice = createHdKeyFromMnemonic(mnemonicAlice)
            const newWalletAlice = await createNewWallet(hdKeyAlice, 0)
            const addressesOfAlice = newWalletAlice.addresses
            const firstAddressAlice = addressesOfAlice[0].address
            //console.log("firstAddressAlice", firstAddressAlice)
            chai.expect(firstAddressAlice.substring(0, 1)).to.not.be.uppercase

            const doi = 10
            const funding = await fundWallet(firstAddressAlice, doi)

            const mnemonicBob = generateMnemonic()
            const hdKeyBob = createHdKeyFromMnemonic(mnemonicBob)
            const newWalletBob = await createNewWallet(hdKeyBob, 0)
            const addressesOfBob = newWalletBob.addresses
            const firstAddressBob = addressesOfBob[0].address
           // console.log("firstAddressBob", firstAddressBob)
            chai.expect(firstAddressBob.substring(0, 1)).to.not.be.uppercase

            await setTimeout(async function () {

                const derivationPath = 'm/0/0/0'
                const xpubMasterAlice = bitcoin.bip32.fromBase58(hdKeyAlice.publicExtendedKey)
                const walletDataAlice = await getBalanceOfWallet(xpubMasterAlice, derivationPath)
               // console.log('walletDataAlice', walletDataAlice)
            //    console.log('walletDataAlice.addresses[0].transactions', walletDataAlice.addresses[0].transactions)
                chai.assert.isAtLeast(walletDataAlice.balance, 10, "should be at least 10")

               const xpubMasterBob = bitcoin.bip32.fromBase58(hdKeyBob.publicExtendedKey)
                const walletDataBob = await getBalanceOfWallet(xpubMasterBob, derivationPath)
                  // console.log('walletDataBob', walletDataBob)
                chai.assert.equal(walletDataBob.balance, 0, "should be at least 1")

                let selectedInputs = getUnspents(walletDataAlice)
               console.log('selectedInputs', selectedInputs)
               const amount = 10000000
               const destAddress = firstAddressBob
               const changeAddress = firstAddressAlice //TODO please implement getNewChangeAddress
               let walletKey = hdKeyAlice.derive(derivationPath)
               let txResponse = await sendToAddress(walletKey, destAddress, changeAddress, amount, selectedInputs)     //chai.expect(addressesOfBob[0].address.substring(0,1)).to.not.be.uppercase
               chai.assert.equal(txResponse.status, 'success', "problem with sending transaction to blockchain")

              // console.log('txResponse', txResponse)
                        await setTimeout(async function () {
                          //get new balance
                        const xpubMasterAlice = bitcoin.bip32.fromBase58(hdKeyAlice.publicExtendedKey)
                        const derivationPath = 'm/0/0/0'
                        const walletDataAlice2 = await getBalanceOfWallet(xpubMasterAlice, derivationPath)
                       // console.log("walletDataAlice2.transactions",walletDataAlice2.addresses[0].transactions)
                        chai.assert.equal(walletDataAlice2.balance, 9.8993182, "amount of alice is wrong")
                        updateWalletWithUnconfirmedUtxos(txResponse,walletDataAlice2)
                        //console.log("walletDataAlice2",walletDataAlice2.addresses[0].transactions)
                        selectedInputs = getUnspents(walletDataAlice2)
                        chai.assert.equal(selectedInputs.length, 1, "we should only have one input here")
                        chai.assert.equal(selectedInputs[0].amount, 9.8993182, "amount the input is incorrect")

                        const xpubMasterBob = bitcoin.bip32.fromBase58(hdKeyBob.publicExtendedKey)
                        const walletDataBob2 = await getBalanceOfWallet(xpubMasterBob, derivationPath)
                            console.log(walletDataBob2)
                        chai.assert.equal(walletDataBob2.balance, 0.1, "should be at least 0.1 DOI")


                        //send 0.2 BTC
                        const amount2 = 20000000
                        const txResponse2 = await sendToAddress(walletKey, destAddress, changeAddress, amount2, selectedInputs)     //chai.expect(addressesOfBob[0].address.substring(0,1)).to.not.be.uppercase
                        console.log('txResponse',txResponse)
                        chai.assert.equal(txResponse2.status, 'success', "problem with sending transaction to blockchain")

                        //TODO now check balance of alice & bob again
                        //TODO check usnpents one more time

                    }, 3000)
            }, 3000)

        })
    })
});
