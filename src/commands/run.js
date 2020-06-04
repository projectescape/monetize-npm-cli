//   Execute a program with monetization enabled

const cwd = `${process.cwd()}/`;
const { existsSync } = require("fs");

// Create a monetization object and its proxy for extensions to interact with

const monetization = (() => {
  const packages = [];

  return {
    get packages() {
      return packages;
    },
    set packages(val) {
      packages = val;
    },

    getState(name, version) {
      for (let i = 0; i < packages.length; i++) {
        if (packages[i].name === name && packages[i].version === version) {
          return packages[i].state;
        }
      }
      console.log(`No package ${name}@${version} found\n`);
      return undefined;
    },

    addListener(name, version, listener, foo) {
      if (
        !(
          listener === "monetizationpending" ||
          listener === "monetizationstart" ||
          listener === "monetizationstop" ||
          listener === "monetizationprogress"
        )
      ) {
        console.log(`${listener} is not a valid event name\n`);
        return false;
      }
      for (let i = 0; i < packages.length; i++) {
        if (packages[i].name === name && packages[i].version === version) {
          packages[i][listener].push(foo);
          return true;
        }
      }
      console.log(`No package ${name}@${version} found\n`);
      return false;
    },
    removeListener(name, version, listener, foo = undefined) {
      if (
        !(
          listener === "monetizationpending" ||
          listener === "monetizationstart" ||
          listener === "monetizationstop" ||
          listener === "monetizationprogress"
        )
      ) {
        console.log(`${listener} is not a valid event name\n`);
        return false;
      }
      for (let i = 0; i < packages.length; i++) {
        if (packages[i].name === name && packages[i].version === version) {
          if (!foo) {
            packages[i][listener] = [];
          } else {
            packages[i][listener] = packages[i][listener].filter(
              (found) => foo !== found
            );
          }
          return true;
        }
      }
      console.log(`No package ${name}@${version} found\n`);
      return false;
    },
    invokeListener(i, listener) {
      packages[i][listener].forEach((l) => {
        l();
      });
    },
  };
})();

globalThis.monetization = new Proxy(monetization, {
  set: () => {
    console.log("Not allowed to mutate values\n");
  },
  get(target, key, receiver) {
    if (
      key === "getState" ||
      key === "addListener" ||
      key === "removeListener"
    ) {
      return Reflect.get(...arguments);
    } else {
      console.log(`Not allowed to access monetization.${key}\n`);
      return null;
    }
  },
});

module.exports = async (args) => {
  // Check if file exists
  if (!existsSync(`${cwd}${args._[0]}`)) {
    console.log(`${args._[0]} not found, exiting\n`);
    process.exit();
  }
  // Handle Timeout
  let timeout = 20000;
  if (args.timeout || args.T) {
    if (timeout < (args.timeout ? args.timeout : args.T)) {
      timeout = args.timeout ? args.timeout : args.T;
    }
  }
  // Handle Provider
  let providerPackage;
  if (args.provider || args.P) {
    // Handle provider change
    providerPackage = require("../utils/provider")(
      args.P ? args.P : args.provider
    );
  } else {
    console.log("No provider specified, defaulting to Coil\n");
    providerPackage = require("../utils/provider")("coil");
  }

  // Get list of monetized packages
  monetization.packages = await require("../utils/list")(
    cwd,
    args.depth ? args.depth : 3
  );
  if (monetization.packages.length > 0) {
    console.log(`Monetizing ${monetization.packages.length} packages\n`);
    await require(providerPackage.package).monetize(monetization, timeout);
  } else {
    console.log("0 monetized packages found\n");
  }
  console.log("Running application\n");
  require(`${cwd}${args._[0]}`);
};
