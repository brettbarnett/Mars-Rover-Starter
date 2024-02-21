const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  it("constructor sets position and default values for mode and generatorWatts", function () {
    let roverObj = new Rover(123456);
    expect(roverObj.position).toBe(123456);
    expect(roverObj.generatorWatts).toBe(110);
  });

  it("response returned by receiveMessage contains the name of the message", function () {
    let roverObj = new Rover(123456);
    let messageObj = new Message("Move Message", new Command("MOVE", 1234));
    let response = roverObj.receiveMessage(messageObj);

    expect(response.message).toBe("Move Message");
  });

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function () {
    let roverObj = new Rover(123456);
    let messageObj = new Message("Multiple Commands", [
      new Command("MOVE", 123),
      new Command("STATUS_CHECK")
    ]);
    let response = roverObj.receiveMessage(messageObj);

    expect(response.results.length).toBe(2); //Sending 2 commands so should get back 2 results
  });

  it("responds correctly to the status check command", function () {
    let roverObj = new Rover(123456);
    let messageObj = new Message("Status Check Message", [
      new Command("STATUS_CHECK")
    ]);
    let response = roverObj.receiveMessage(messageObj);

    expect(response.results[0].completed).toBe(true);
  });

  it ("responds correctly to the mode change command", function () {
    let roverObj = new Rover(123456);
    let messageObj = new Message("Mode Change Message", [
      new Command("MODE_CHANGE", "LOW_POWER"),
      new Command("STATUS_CHECK")
    ]);
    let response = roverObj.receiveMessage(messageObj);

    expect(response.results[0].completed).toBe(true);
    expect(response.results[1].roverStatus.mode).toBe("LOW_POWER");
  });

  it ("responds with a false completed value when attempting to move in LOW_POWER mode", function () {
    let roverObj = new Rover(123456);
    let messageObj = new Message("Mode Change Message", [
      new Command("MODE_CHANGE", "LOW_POWER"),
      new Command("MOVE", 1234),
      new Command("STATUS_CHECK")
    ]);
    response = roverObj.receiveMessage(messageObj);

    expect(response.results[1].completed).toBe(false); //Since the movement failed 'completed' will be false
    expect(response.results[2].roverStatus.position).toBe(123456); //The position should be what we started with
  });

  it ("responds with the position for the move command", function () {
    let roverObj = new Rover(123456);
    let messageObj = new Message("Movement Message", [
      new Command("MOVE", 98765),
      new Command("STATUS_CHECK")
    ]);
    let response = roverObj.receiveMessage(messageObj);

    expect(response.results[0].completed).toBe(true);
    expect(response.results[1].roverStatus.position).toBe(98765);
  });
});