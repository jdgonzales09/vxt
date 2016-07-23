'use strict';

var _ = require ('lodash');
var rp = require ('request');
var ENDPOINTORIGIN = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&';
var ENDPOINTDESTINATION = '&destinations='
var APIKEY = '&key=AIzaSyDtJ4alv_t14lQbvTENMhKNhjNNIpzI9rE'

function AddressHelper() {
}

AddressHelper.prototype.getOriginAddress = function(originStreetNumber, originStreetName, originZipCode, desStreetNumber, desStreenName, desZipCode) {
    var options = {
        method: 'GET',
        uri: ENDPOINTORIGIN + originStreetNumber + originStreetName + originZipCode + ENDPOINTDESTINATION + desStreetNumber + desStreetName + desZipCode + APIKEY,
        json: true
    };

    return requestPromise(options);
};

module.exports = AddressHelper;
