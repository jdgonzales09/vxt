/* storage.js contains all logic pertaining to stored user states and interaction with DynamoDB */

'use strict';

var AWS = require("aws-sdk");


var storage = (function () {
    var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

    AddressSave function (callback) {
        dynamodb.putItem({
            TableName: "UserAddresses",
            Item: {
                
            }

        });
    }
});

module.exports = storage;
