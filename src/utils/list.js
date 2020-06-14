// This returns all packages installed that support Web Monetization

const { yellow, red, bgWhite, black } = require("kleur");

const fg = require("fast-glob");
const { existsSync } = require("fs");

const list = async (location, depth = 3) => {
  let found = false;
  //   Checking for package.json in /../ * depth
  for (let i = 0; i < depth && !found; i++) {
    if (existsSync(`${location}/package.json`)) {
      found = true;
      break;
    }
    location += "../";
  }

  if (found) {
    console.log(`package.json found at ${yellow(`${location}package.json`)}\n`);
    let results = await fg([`${location}node_modules/**/package.json`]);
    let current;
    const monetized = [];
    results = results.forEach((location) => {
      current = require(location);
      if (current.webMonetization) {
        monetized.push({
          name: current.name,
          version: current.version,
          webMonetization: current.webMonetization,
          state: "stopped",
          monetizationpending: [],
          monetizationstart: [],
          monetizationstop: [],
          monetizationprogress: [],
        });
      }
    });
    return monetized;
  } else {
    console.log(
      red(
        `No ${yellow(
          "package.json"
        )} found. Check location or specify depth using ${bgWhite(
          black(` --depth `)
        )}\n `
      )
    );
    process.exit();
  }
};

module.exports = list;
