'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var VXTDataHelper = require('../VXTDataHelper');
chai.config.includeStack = true;

describe('VXTDataHelper', function() {
  var subject = new VXTDataHelper();
  var originStreetNumber;
  var originStreetName;
  var originZipCode;
  var desStreetNumber;
  var desStreetName;
  var desZipCode;
  describe('#getDistance', function() {
    context('with a valid address', function() {
      it ('returns full matching addresses', function() {
        originStreetNumber = '3424';
        originStreetName = 'Wharton Drive';
        originZipCode = '76133';
        desStreetNumber = '9236';
        desStreetName = 'Church Road';
        desZipCode = '75231';
        var value = subject.getDistance(originStreetNumber, originStreetName, originZipCode, desStreetNumber, desStreetName, desZipCode).then(function(obj) {
          return obj.origin_addresses;
        });
        return expect(value).to.eventually.eq("3424 Wharton Dr, Fort Worth, TX 76133, USA");
      });
    });
  });
});
