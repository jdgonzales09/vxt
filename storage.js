/* storage.js contains all logic pertaining to stored user states and interaction with DynamoDB */

'use strict';
var AWS = require("aws-sdk");

var storage = (function () {
    var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

    function Addresses (session, data) {
        if (data) {
           console.log("Addresses function data exists");
            this.data = data;
        } else {
            this.data = {
                UsedAddresses: []
            };
        }
        this._session = session;
    }

    Addresses.prototype = {
        // isEmptyData: function () {
        //     var allEmpty = true;
        //     var addressData = this.data;
        //     addressData.user.forEach(function (player) {
        //         if (addressData.scores[user] !== 0) {
        //             allEmpty = false;
        //         }
        //     });
        //     return allEmpty;
        // },
        save: function (callback) {
            this._session.attributes.currentAddress = this.data;
            dynamodb.putItem({
                TableName: 'VxTUserData',
                Item: {
                    UserId: {
                        S: this._session.user.userId
                    },
                    Data: {
                        S: JSON.stringify(this.data)
                    }
                }
            }, function (err, data) {
                if (err) {
                    console.log(err, err.stack);
                }
                if (callback) {
                    callback();
                }
            });
        }
    };

    return {
        loadAddresses: function (session, callback) {
            if (session.attributes.currentAddress) {
                console.log('get address from session=' + session.attributes.currentAddress);
                callback(new Addresses(session, session.attributes.currentAddress));
                return;
            }
            console.log('session.user.userId: ' + session.user.userId);
            dynamodb.getItem({
                TableName: 'VxTUserData',
                Key: {
                    UserId: {
                        S: session.user.userId
                    }
                }
            }, function (err, data) {
                var currentAddress;
                if (err) {
                    console.log(err, err.stack);
                    currentAddress = new Addresses(session);
                    session.attributes.currentAddress = currentAddress.data;
                    callback(currentAddress);
                } else if (data.Item === undefined) {
                    currentAddress = new Addresses(session);
                    session.attributes.currentAddress = currentAddress.data;
                    callback(currentAddress);
                } else {
                    console.log('get address from dynamodb=' + data.Item.Data.S);
                    currentAddress = new Addresses(session, JSON.parse(data.Item.Data.S));
                    session.attributes.currentAddress = currentAddress.data;
                    callback(currentAddress);
                }
            });
        },
        newAddresses: function (session) {
            return new Addresses(session);
        }
    };
})();
module.exports = storage;
