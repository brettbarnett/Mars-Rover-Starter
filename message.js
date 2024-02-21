class Message {
   constructor(name, commands) {
      if (!name) {
         throw Error("You need to pass in at least one parameter.");
      }
      
      this.name = name;
      this.commands = commands;
   }
}

module.exports = Message;