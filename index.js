'use strict';

var APP_ID = 'undefined';
var AlexaSkill = require('./AlexaSkill');
var storage = require('./storage');

var VxTSkill = function() {
  AlexaSkill.call(this, APP_ID);
};

VxTSkill.prototype = Object.create(AlexaSkill.prototype);
VxTSkill.prototype.constructor = VxTSkill;

VxTSkill.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
  console.log("VxTSkill onSessionStarted requestId: " + sessionStartedRequest.requestId
  + ", sessionId: " + session.sessionId);
};

VxTSkill.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
  console.log("VxTSkill onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
};

VxTSkill.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
  console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.session.Id)
};

VxTSkill.prototype.intentHandlers = {

  "GetDistanceIntent": function (intent, session, response) {
    handleGetDistanceIntentRequest(intent, session, response);
  },

  "AMAZON.StopIntent": function (intent, session, response) {
    var speechOutput = {
      speech: "Goodbye",
      type: AlexaSkill.speechOutputType.PLAIN_TEXT
    };
    response.tell(speechOutput);
  },

  "AMAZON.CancelIntent": function (intent, session, response) {
    var speechOutput = {
      speech: "Goodbye",
      type: AlexaSkill.speechOutputType.PLAIN_TEXT
    };
    response.tell(speechOutput);
  }
};

/* Make API call here */
function handleGetDistanceIntentRequest(intent, session, response) {
  storage.loadAddresses(session, function(currentAddress) {
    console.log(currentAddress);

    currentAddress.save(function () {
      response.tell("Your test was successfully saved");
    });
  });
};

exports.handler = function (event, context) {
  var skill = new VxTSkill();
  skill.execute(event, context);
};
