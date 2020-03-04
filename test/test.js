import chai from 'chai'
import {printHello} from '../index'

describe('js-doichain', function(){
  describe('sayHello()', function(){
    it('printHello should return hello', function(){
      //let result = app.sayHello();
      chai.assert.equal(printHello(), 'hello');
    });
  });


});
