'use strict';

var storage = require('./storage'),

var registerEventHandlers = function (launchRequest, session, reponse) {
    eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
        skillContext.needMoreHelp = false;
    };

    eventHandlers.onLaunch = function (launchRequest, session, response) {
        var speechOutput = 'Where would you like to go today?',
        response.ask(speechOutput)
    };
};

var registerIntentHandlers = function (intentHandlers, skillContext) {
    intentHandlers.getDistanceIntent = function (intent, session, response) {
       var speechOutput,
       var NewAddress = textHelper.getDestinationAddress(intent.slots.DestinationAddress.value);
       
       response.tell(speechOutput + NewAddress);
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


