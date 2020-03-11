import chai from 'chai'
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
import {createDoichainWalletFromHdKey,noEmailError} from "../lib/createDoichainWalletFromHdKey"
import {getAddress} from "../lib/getAddress"
import {changeNetwork, DEFAULT_NETWORK, DOICHAIN_REGTEST,DOICHAIN_TESTNET,DOICHAIN} from "../lib/network"
import {fundWallet} from "../lib/fundWallet";

describe('js-doichain', function(){

  describe('basic doichain functions', function(){
    it('should create a new mnemonic seed phrase', function () {
      const mnemonic = generateMnemonic()
      chai.assert.equal(mnemonic.split(' ').length,12,'mnemonic doesnt contain 12 words')
    })

    it('should validate a mnemonic seed phrase', function () {
      const mnemonic = "balance blanket camp festival party robot social stairs noodle piano copy drastic"
      const valid = validateMnemonic(mnemonic)
      chai.assert.equal(valid,true,"mnomnic seed phrase not valid")
    })

    it('should create a hdkey from a mnemonic without password', function() {
      const mnemonic = "balance blanket camp festival party robot social stairs noodle piano copy drastic"
      const hdKey = createHdKeyFromMnemonic(mnemonic)
      chai.expect(hdKey).to.have.own.property('_privateKey');
      chai.expect(hdKey).to.have.own.property('_publicKey');
    })

    it('should create a new Doichain wallet from a seed in mainnet', function () {
      const mnemonic = "balance blanket camp festival party robot social stairs noodle piano copy drastic"
      const hdKey = createHdKeyFromMnemonic(mnemonic)

      chai.expect(() => createDoichainWalletFromHdKey(hdKey)).to.throw();
      chai.expect(() => createDoichainWalletFromHdKey(hdKey,'alice@ci-doichain.org')).to.not.throw();

      const wallet = createDoichainWalletFromHdKey(hdKey,'alice@ci-doichain.org',DOICHAIN)
      // bitcoin testnet P2PKH addresses start with a 'm' or 'n'
      chai.assert.strictEqual(wallet.addresses[0].address.startsWith('M') || wallet.addresses[0].address.startsWith('N'),true)
      chai.expect(wallet.addresses[0].address).to.have.length(34)
      chai.expect(wallet.addresses[0].address.substring(0,1)).to.be.uppercase
    })

    it('should create a new Doichain wallet from a seed in testnet', function () {
      const mnemonic = "balance blanket camp festival party robot social stairs noodle piano copy drastic"
      const hdKey = createHdKeyFromMnemonic(mnemonic)
      const wallet = createDoichainWalletFromHdKey(hdKey,'alice@ci-doichain.org',DOICHAIN_TESTNET)
      chai.assert.strictEqual(wallet.addresses[0].address.startsWith('m') || wallet.addresses[0].address.startsWith('n'),true)
      chai.expect(wallet.addresses[0].address).to.have.length(34)
      chai.expect(wallet.addresses[0].address.substring(0,1)).to.not.be.uppercase
    })

    it('should create a new Doichain address for a regtest wallet ', function () {
      changeNetwork('regtest')
      const mnemonic = "balance blanket camp festival party robot social stairs noodle piano copy drastic"
      const hdKey = createHdKeyFromMnemonic(mnemonic)
      const wallet = createDoichainWalletFromHdKey(hdKey,'alice@ci-doichain.org',DEFAULT_NETWORK)
      chai.assert.strictEqual(wallet.addresses[0].address.startsWith('m') || wallet.addresses[0].address.startsWith('n'),true)
      chai.expect(wallet.addresses[0].address).to.have.length(34)
      chai.expect(wallet.addresses[0].address.substring(0,1)).to.not.be.uppercase
      fundWallet(wallet.addresses[0].address)
      const doi = 10
      //sendDoicoinToAddress()

    })

    it('should fund a new regtest wallet ', function () {
      const address = undefined
      chai.expect(address).to.have.length(34)
      chai.expect(address.substring(0,1).to.be.uppercase)
    })

    it('should get all transactinos for a wallet', function () {
      const transactions = undefined
      chai.expect(transactions).to.be.an('array')
    })

    it('should get all transactinos for an address', function () {
      const transactions = undefined
      chai.expect(transactions).to.be.an('array')
    })

    it('should create a new Doichain change address in wallet', function () {
      const transactions = undefined
      chai.expect(transactions).to.be.an('array')
    })
  })

});
