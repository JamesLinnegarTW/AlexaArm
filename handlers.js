var Robot = require("./lib/robot");

var robot = new Robot();
var handlers = {
    // register custom intent handlers
    "LaunchRequest": function () {
      robot.wake()
      .then(()=> {
        this.emit(':ask', "Welcome, what would you like to do?", "Can help?");
      });
    },

    "RotateArm": function(){
      var rotation = parseInt(this.event.request.intent.slots.angle.value);
      if(rotation <= 180){
        robot.rotateArmTo(rotation)
        .then(()=> {
          this.emit(':ask', `Rotating arm to ${rotation} degrees`, "Can help?");
        });
      } else {
        this.emit(':ask', `I'm sorry ${rotation} degrees is beyond my ability`, "Can help?");
      }
    },

    "RotateHand": function(){
      var rotation = parseInt(this.event.request.intent.slots.angle.value);
      if(rotation <= 180){
        robot.rotateHandTo(rotation)
        .then(()=> {
          this.emit(':ask',
          `Rotating hand to ${rotation} degrees`, "Can help?");
        });
      } else {
        this.emit(':ask',
        `I'm sorry, ${rotation} degrees is beyond my ability`, "Can help?");
      }
    },

    "PickUp": function(){
      robot.pickUp()
      .then(()=> {
        this.emit(':ask',
        `Picking up`, "Can help?");
      });
    },

    "Answerphone": function(){
      robot.phone()
      .then(()=> {
        this.emit(':tell',
        `Picking up`);
      });
    },

    "PutDown": function(){
      robot.putDown()
      .then(()=> {
        this.emit(':ask',
        'dropping', "Can help?");
      });
    },

    "RaiseArm": function(){
      robot.raiseArm()
      .then(()=> {
        this.emit(':ask',
        `Raising the arm`, "Can help?");
      });
    },

    "LowerArm": function(){
      robot.lowerArm()
      .then(()=> {
        this.emit(':ask',
        `Lowering the arm`, "Can help?");
      });
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
      this.emit(':ask',
        "You can ask me to raise the arm, rotate to an angle, pick up or drop.",
        "If you don't say anything I'll just wait.");
    },

    "AMAZON.CancelIntent": function(intent, session, response){
      robot.sleep();
      this.emit(':tell', "goodbye");
    },

    "AMAZON.StopIntent": function(intent, session, response){
      robot.sleep();
      this.emit(':tell', "goodbye");
    },

    'SessionEndedRequest': function () {
        console.log('session ended!');
        robot.sleep();
    },

    'Unhandled': function() {
      this.emit(':ask', "I'm sorry I don't know how to proceed");
    }
  };

module.exports = handlers;
