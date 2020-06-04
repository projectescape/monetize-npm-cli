const cwd = `${process.cwd()}/`;
console.log();

module.exports = async (args) => {
  if (args.help || args.h) {
    // Display Help Page
  } else if (args.login || args.L) {
    // Handle Login
    if (args.extension || args.E) {
      // Handle extension change
    }
  } else if (args.logout) {
    // Handle Logout
    if (args.extension || args.E) {
      // Handle extension change
    }
  } else if (args.list || args.l) {
    // Display Monetized Package list
    const list = require("./list");
    const monetized = await list(cwd);
    console.log(`${monetized.length} web monetized packages found\n`);
    if (args.expand) {
      for (let i = 0; i < monetized.length; i++) {
        console.log(
          `Name : ${monetized[i].name}, Wallet : ${monetized[i].webMonetization.wallet}`
        );
      }
    } else {
      console.log(
        "Execute --expand along with list to get full list of web monetized packages"
      );
    }
  } else if (args.run || args.r || args._.length !== 0) {
    // Execute file in environment
    if (args.env || args.e) {
      // Handle Environemnt modification
    }
    if (args.provider || args.P) {
      // Handle Provider change
    }
    if (args.timeout || args.T) {
      // Handle Timeout
    }
  } else {
    // Display Help Page
  }
};
