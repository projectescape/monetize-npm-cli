require = require("esm")(module);
const minimist = require("minimist");
const args = minimist(process.argv.slice(2));

const argsHandler = require("./src");
argsHandler(args);
