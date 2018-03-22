var AWS = require("aws-sdk");

function Robot(){
    AWS.config.region = process.env.IOT_BROKER_REGION;
    var iotData = new AWS.IotData({endpoint: process.env.IOT_BROKER_ENDPOINT});

    this.rotateArmTo = function(message){
      var paramsUpdate = {
          topic:"/arm",
          payload: JSON.stringify({"instruction": "rotatateArm", "data":message}),
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


    this.rotateHandTo = function(message){
      var paramsUpdate = {
          topic:"/arm",
          payload: JSON.stringify({"instruction": "rotatateHand", "data":message}),
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

    this.raiseArm = function(){
      var paramsUpdate = {
          topic:"/arm",
          payload: JSON.stringify({"instruction": "raiseArm"}),
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

    this.lowerArm = function(){
      var paramsUpdate = {
          topic:"/arm",
          payload: JSON.stringify({"instruction": "lowerArm"}),
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

    this.pickUp = function(){
      var paramsUpdate = {
          topic:"/arm",
          payload: JSON.stringify({"instruction": "pickup"}),
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

    this.putDown = function(){
      var paramsUpdate = {
          topic:"/arm",
          payload: JSON.stringify({"instruction": "putDown"}),
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
