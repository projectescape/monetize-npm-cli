// For Readability
console.log();

module.exports = async (args) => {
  if (args.help || args.h) {
    // Display Help Page
    require("./commands/help")();
  } else if (args.login || args.L) {
    //   Handle Login
    require("./commands/login")(args);
  } else if (args.logout) {
    //   Handle Logout
    require("./commands/logout")(args);
  } else if (args.list || args.l) {
    //   Display list of web monetization supported packages\
    require("./commands/list")(args);
  } else if (args.version || args.v) {
    const package = require("../package.json");
    console.log(`${package.name} v${package.version}\n`);
  } else if (args._.length !== 0) {
    //   Execute a program with monetization enabled
    require("./commands/run")(args);
  } else {
    // Display Help Page
    require("./commands/help")();
  }
};
