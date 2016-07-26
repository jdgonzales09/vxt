'use strict';

var _ = require ('lodash');
var rp = require ('request-promise');
var ENDPOINTORIGIN = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=';
var ENDPOINTDESTINATION = '&destinations=';
var APIKEY = '&departure_time=1541202457&traffic_model=best_guess&key=AIzaSyDtJ4alv_t14lQbvTENMhKNhjNNIpzI9rE';

function VXTDataHelper() {
}

VXTDataHelper.prototype.requestAddressDistance = function(originStreetNumber, originStreetName, originZipCode, desStreetNumber, desStreetName, desZipCode) {
  return this.getDistance(originStreetNumber, originStreetName, originZipCode, desStreetNumber, desStreetName, desZipCode).then(
    function(response) {
      console.log('success - receieved distance info for ' + originStreenNumber + originStreetName + originZipCode + 'to' + desStreetNumber + desStreetName + desZipCode);
      return response.body;
    }
  );
};

VXTDataHelper.prototype.getDistance = function(originStreetNumber, originStreetName, originZipCode, desStreetNumber, desStreetName, desZipCode) {
    var options = {
        method: 'GET',
        uri: ENDPOINTORIGIN + originStreetNumber + '+' + originStreetName + '+' + originZipCode + '+' + ENDPOINTDESTINATION + '+' + desStreetNumber + '+' + desStreetName + '+' + desZipCode + APIKEY,
        resolveWithFullResponse: true,
        json: true
    };

    return rp(options);
};


module.exports = VXTDataHelper;
