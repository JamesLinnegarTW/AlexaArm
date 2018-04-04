var AWS = require("aws-sdk");

AWS.config.region = process.env.IOT_BROKER_REGION;
var iotData = new AWS.IotData({endpoint: process.env.IOT_BROKER_ENDPOINT});

function Robot(){

    this.rotateArmTo = function(message){
      var angle = message - 90;
      var instruction = {"instruction": "rotateArm", "data":angle};
      return sendInstruction(instruction);
    };


    this.rotateHandTo = function(message){
      var angle = message - 90;
      var instruction = {"instruction": "rotateHand", "data":angle};
      return sendInstruction(instruction);
    };

    this.raiseArm = function(){
      var instruction = {"instruction": "raiseArm"};
      return sendInstruction(instruction);
    };

    this.lowerArm = function(){
      var instruction = {"instruction": "lowerArm"};
      return sendInstruction(instruction);
    };

    this.pickUp = function(){
      var instruction = {"instruction": "pickup"};
      return sendInstruction(instruction);
    };

    this.putDown = function(){
      var instruction = {"instruction": "putDown"};
      return sendInstruction(instruction);
    };


    this.wake = function(){
      var instruction = {"instruction": "wake"};
      return sendInstruction(instruction);
    };

    this.phone = function(){
      var instruction = {"instruction": "phone"};
      return sendInstruction(instruction);
    };

    this.sleep = function(){
      var instruction = {"instruction": "sleep"};
      return sendInstruction(instruction);
    };


    function sendInstruction(payload){
      var paramsUpdate = {
          topic:"/arm",
          payload: JSON.stringify(payload),
          qos:0
      };
      return new Promise(function(resolve, reject){
          iotData.publish(paramsUpdate, function(err, data) {
              if (err){
                  console.warn("MQTT Error " + err);
                  reject("display error");
              }
              resolve();
          });
      });

    };

}


module.exports = Robot;
