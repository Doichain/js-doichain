import chai from 'chai'
import {printHello} from '../index'
import {generateMnemonic} from '../lib/generateMnemonic'
import {validateMnemonic} from "../lib/validateMnemonic";
import {createHdKeyFromMnemonic} from "../lib/createHdKeyFromMnemonic"

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


  })

});
