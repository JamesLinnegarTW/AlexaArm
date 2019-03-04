const Alexa = require('ask-sdk-core');
const Robot = require("./lib/robot");

const robot = new Robot();


const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText = "Welcome, what would you like to do?";
    const reprompt = "Can I help?";
    return robot.wake()
            .then(()=> {
              return handlerInput.responseBuilder
                .speak(speechText)
                .reprompt(reprompt)
                .getResponse();
            });
  }
};

const RotateArmHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.intent.name === 'RotateArm';
  },
  handle(handlerInput) {
    const slots =  handlerInput.requestEnvelope.request.intent.slots;
    const rotation = parseInt(slots.angle.value);

    if(rotation <= 180 && rotation >=0) {
      const speechText = "Picking Up";
      const reprompt = "what next?";
      return robot.rotateArmTo(rotation)
              .then(()=> {
                return handlerInput.responseBuilder
                  .speak(`Rotating arm to ${rotation} degrees`)
                  .reprompt(reprompt)
                  .getResponse();
              });
    } else {
      return handlerInput.responseBuilder
        .speak( `I'm sorry ${rotation} degrees is beyond my ability`)
        .reprompt("What next?")
        .getResponse();
    }

  }
};


const RotateHandHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.intent.name === 'RotateHand';
  },
  handle(handlerInput) {
    const slots =  handlerInput.requestEnvelope.request.intent.slots;
    const rotation = parseInt(slots.angle.value);

    if(rotation <= 180 && rotation >=0) {
      const reprompt = "what next?";
      return robot.rotateHandTo(rotation)
              .then(()=> {
                return handlerInput.responseBuilder
                  .speak(`Rotating hand to ${rotation} degrees`)
                  .reprompt(reprompt)
                  .getResponse();
              });
    } else {
      return handlerInput.responseBuilder
        .speak( `I'm sorry ${rotation} degrees is beyond my ability`)
        .reprompt("what next?")
        .getResponse();
    }

  }
};




const PickUpHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.intent.name === 'PickUp';
  },
  handle(handlerInput) {
    const speechText = "Picking Up";
    const reprompt = "what next?";
    return robot.pickUp()
            .then(()=> {
              return handlerInput.responseBuilder
                .speak(speechText)
                .reprompt(reprompt)
                .getResponse();
            });
  }
};

const PutDownHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.intent.name === 'PutDown';
  },
  handle(handlerInput) {
    const speechText = "Putting down";
    const reprompt = "what next?";
    return robot.putDown()
            .then(()=> {
              return handlerInput.responseBuilder
                .speak(speechText)
                .reprompt(reprompt)
                .getResponse();
            });
  }
};

const RaiseArmHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.intent.name === 'RaiseArm';
  },
  handle(handlerInput) {
    const speechText = "Raising the arm";
    const reprompt = "what next?";
    return robot.raiseArm()
            .then(()=> {
              return handlerInput.responseBuilder
                .speak(speechText)
                .reprompt(reprompt)
                .getResponse();
            });
  }
};

const LowerArmHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.intent.name === 'LowerArm';
  },
  handle(handlerInput) {
    const speechText = "Lowering the arm";
    const reprompt = "what next?";
    return robot.lowerArm()
            .then(()=> {
              return handlerInput.responseBuilder
                .speak(speechText)
                .reprompt(reprompt)
                .getResponse();
            });
  }
};


const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'You can say hello to me!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  }
};


const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Goodbye!';
    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  }
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    //any cleanup logic goes here
    return handlerInput.responseBuilder.getResponse();
  }
};


const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};


exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    RotateArmHandler,
    RotateHandHandler,
    PickUpHandler,
    PutDownHandler,
    RaiseArmHandler,
    LowerArmHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler)
  .addErrorHandlers(ErrorHandler)
  .lambda();
