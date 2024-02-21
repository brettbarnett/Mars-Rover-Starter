const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {
    it("throws error if a name is NOT passed into the constructor as the first parameter", function() {
        expect(function() {
            new Message();
        }).toThrow(new Error("You need to pass in at least one parameter."));
    });

    it("constructor sets name", function() {
        let messageObj = new Message("messageName");
        expect(messageObj.name).toBe("messageName");
    });

    it("contains a commands array passed into the constructor as the 2nd argument", function() {
        let commandArray = [
            new Command("commandType1", "commandValue1"),
            new Command("commandType2", "commandValue2"),
            new Command("commandType3", "commandValue3")
        ];

        let messageObj = new Message("messageName", commandArray);
        
        expect(messageObj.commands[0].value).toBe("commandValue1");
        expect(messageObj.commands[1].value).toBe("commandValue2");
        expect(messageObj.commands[2].value).toBe("commandValue3");
    });
});
