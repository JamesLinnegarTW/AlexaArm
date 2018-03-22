var Robot = require("./lib/robot");

var robot = new Robot();
var handlers = {
    // register custom intent handlers
    "LaunchRequest": function () {
      this.emit(':ask',
        "Welcome, what postit would you like?");
    },

    "RotateArm": function(){
      var rotation = 90;
      robot.rotateArmTo(rotation)
      .then(()=> {
        this.emit(':ask',
        `Rotating arm to ${rotation} degrees`);
      });
    },

    "RotateHand": function(){
      var rotation = 90;
      robot.rotateHandTo(rotation)
      .then(()=> {
        this.emit(':ask',
        `Rotating hand to ${rotation} degrees`);
      });
    },

    "PickUp": function(){
      robot.pickUp()
      .then(()=> {
        this.emit(':ask',
        `Picking up`);
      });
    },

    "PutDown": function(){
      robot.putDown()
      .then(()=> {
        this.emit(':ask',
        'dropping');
      });
    },

    "RaiseArm": function(){
      robot.raiseArm()
      .then(()=> {
        this.emit(':ask',
        `Raising the arm`);
      });
    },

    "LowerArm": function(){
      robot.lowerArm()
      .then(()=> {
        this.emit(':ask',
        `Lowering the arm`);
      });
    },

    "Card":  function () {
      this.emit(':tell',
        "Picking up a yellow card");
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
      this.emit(':tell',
        "You can ask for tram times to and from stations, set your home station and ask for next trams.",
        "For example, You can ask 'when is the next tram from Chorlton to Eccles'");
    },

    "AMAZON.CancelIntent": function(intent, session, response){
      this.emit(':tell', "goodbye");
    },

    "AMAZON.StopIntent": function(intent, session, response){
      this.emit(':tell', "goodbye");
    },

    'Unhandled': function() {
      this.emit(':ask', "I'm sorry I don't know how to proceed");
    }
  };

module.exports = handlers;
