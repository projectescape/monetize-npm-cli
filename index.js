require = require("esm")(module);
const minimist = require("minimist");

const args = minimist(process.argv.slice(2));

if (args.help || args.h) {
  // Display Help Page
} else if (args.login || args.L) {
  // Handle Login
  if (args.extension || args.E) {
    // Handle extension change
  }
} else if (args.list || args.l) {
  // Display Monetized list
} else if (args.run || args.r || args._.length !== 0) {
  // Execute file in environment
  if (args.env || args.e) {
    // Handle Environemnt modification
  }
  if (args.extension || args.E) {
    // Handle extension change
  }
  if (args.timeout || args.T) {
    // Handle Timeout
  }
} else {
  // Display Help Page
}
