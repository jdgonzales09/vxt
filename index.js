'use strict';

var AlexaSkill = require('./alexaskill');
//var storage = require('./storage');

var registerEventHandlers = function (launchRequest, session, reponse) {
    eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
        console.log("VXT Skill onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
        skillContext.needMoreHelp = false;
    };

    eventHandlers.onLaunch = function (launchRequest, session, response) {
        var speechOutput = 'Where would you like to go today?',
        console.log("VXT Skill onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
        response.ask(speechOutput)
    };

    eventHandlers.onSessionEnded = function (launchRequest, session, response) {
        console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.session.Id)
    };
};

var registerIntentHandlers = function (intentHandlers, skillContext) {
    intentHandlers.getDistanceIntent = function (intent, session, response) {
       var speechOutput = "Ok you want to go to",
       var cardTitle = "Velocity x Time",
       var cardOutput = "Tell me an origin and destination address starting with the street number, then name, then zipcode.",
       response.tellWithCard(speechOutput, cardTitle, cardOutput);
    };


    intentHandlers['AMAZON.StopIntent'] = function (intent, session, response) {
        if (skillContext.needMoreHelper) {
            response.tell('Okay. Whenever you\'re ready, you can start by giving me an address to where you want to go.');
        } else {
            response.tell('');
        }
    };

    intentHandlers['AMAZON.CancelIntent'] = function (intent, session, response) {
        if (skillContext.needMoreHelp) {
            response.tell('Okay. Whenever you\'re ready, you can start by giving me an address to where you want to go.');
        } else {
            response.tell('');
        }
    };
};
