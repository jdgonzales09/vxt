/* storage.js contains all logic pertaining to stored user states and interaction with DynamoDB */

'use strict';
var AWS = require("aws-sdk");

var storage = (function () {
    var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

    /*
     * The Game class stores all game states for the user
     */
    function Addresses (session, data) {
        if (data) {
            this.data = data;
        } else {
            this.data = {
                UsedAddresses: []
            };
        }
        this._session = session;
    }

    Addresses.prototype = {
        isEmptyScore: function () {
            //check if any one had non-zero score,
            //it can be used as an indication of whether the game has just started
            var allEmpty = true;
            var gameData = this.data;
            gameData.players.forEach(function (player) {
                if (gameData.scores[player] !== 0) {
                    allEmpty = false;
                }
            });
            return allEmpty;
        },
        save: function (callback) {
            //save the game states in the session,
            //so next time we can save a read from dynamoDB
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
        newAddress: function (session) {
            return new Addresses(session);
        }
    };
})();
module.exports = storage;
