class Rover {
  constructor(position) {
    this.position = position;
    this.mode = "NORMAL";
    this.generatorWatts = 110;
  }

  receiveMessage(messageObject) {
    let responseObject = {
      message: messageObject.name,
      results: [],
    };
    for (let i = 0; i < messageObject.commands.length; i++) {
      if (messageObject.commands[i].commandType === "STATUS_CHECK") {
        responseObject.results[i] = {
          completed: true,
          roverStatus: {
            mode: this.mode,
            generatorWatts: this.generatorWatts,
            position: this.position
          }
        };
      } else if (messageObject.commands[i].commandType === "MOVE") {
        if (this.mode === "NORMAL") {
          this.position = messageObject.commands[i].value;
          responseObject.results[i] = {
            completed: true,
          };
        } else {
          responseObject.results[i] = {
            completed: false,
          };
        }
      } else if (messageObject.commands[i].commandType === "MODE_CHANGE") {
        if (messageObject.commands[i].value === "LOW_POWER") {
          this.mode = "LOW_POWER";
          responseObject.results[i] = {
            completed: true,
          };
        } else if (messageObject.commands[i].value === "NORMAL") {
          this.mode = "NORMAL";
          responseObject.results[i] = {
            completed: true,
          };
        } else {
          responseObject.results[i] = {
            completed: false,
          };
        }
      }
    }

    return responseObject;
  }
}

module.exports = Rover;