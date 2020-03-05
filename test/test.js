import chai from 'chai'
import {printHello} from '../index'
import {generateMnemonic} from '../lib/generateMnemonic'

describe('js-doichain', function(){

  describe('basic doichain functions', function(){
    it('should create a new seed phrase', function () {
      const mnemonic = generateMnemonic()
      chai.assert.equal(mnemonic.split(' ').length,12,'mnemonic doesnt contain 12 elements')
    })
  })

});
