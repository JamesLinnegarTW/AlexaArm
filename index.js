var Alexa = require('alexa-sdk'),
    handlers = require("./handlers");

exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context, callback);
    alexa.appId = process.env.APPID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
