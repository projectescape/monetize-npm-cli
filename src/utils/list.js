// This returns all packages installed that support Web Monetization

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
    console.log(`package.json found at ${location}package.json\n`);
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
          state: "pending",
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
      "No package.json found. Check location or specify depth using --depth\n"
    );
    process.exit();
  }
};

module.exports = list;
