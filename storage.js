/** storage.js contains all logic pertaining to stored user states and interaction with DynamoDB */

'use strict';

var AWS = require("aws-sdk");


var storage = (function () {
    var dynamodb = new AWS.DynamoDB({apiVersion: '2011-12-05'});

});
