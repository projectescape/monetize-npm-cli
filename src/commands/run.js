//   Execute a program with monetization enabled

const { yellow, red, green } = require("kleur");

const cwd = `${process.cwd()}/`;
const { existsSync } = require("fs");

// Create a monetization object and its proxy for extensions to interact with

const monetization = (() => {
  let packages = [];
  const walletHash = {};
  const nameHash = {};

  return {
    get packages() {
      return packages;
    },
    set packages(val) {
      packages = val;
      val.forEach((p, index) => {
        if (walletHash[p.webMonetization.wallet] === undefined)
          walletHash[p.webMonetization.wallet] = [index];
        else walletHash[p.webMonetization.wallet].push(index);

        nameHash[`${p.name}@${p.version}`] = index;
      });
    },
    getState(name, version) {
      if (nameHash[`${name}@${version}`] !== undefined) {
        return packages[nameHash[`${name}@${version}`]].state;
      }
      console.log(`No package ${name}@${version} found\n`);
      return undefined;
    },
    addEventListener(name, version, listener, foo) {
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
      if (nameHash[`${name}@${version}`] !== undefined) {
        packages[nameHash[`${name}@${version}`]][listener].push(foo);
        return true;
      }
      console.log(`No package ${name}@${version} found\n`);
      return false;
    },
    removeEventListener(name, version, listener, foo = undefined) {
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
      if (nameHash[`${name}@${version}`] !== undefined) {
        if (!foo) {
          packages[nameHash[`${name}@${version}`]][listener] = [];
        } else {
          packages[nameHash[`${name}@${version}`]][listener] = packages[
            nameHash[`${name}@${version}`]
          ][listener].filter((found) => foo !== found);
        }
        return true;
      }
      console.log(`No package ${name}@${version} found\n`);
      return false;
    },
    invokeEventListener(data) {
      walletHash[data.detail.paymentPointer].forEach((index) => {
        packages[index].state =
          data.type === "monetizationstart" ||
          data.type === "monetizationprogress"
            ? "started"
            : data.type === "monetizationpending"
            ? "pending"
            : "stopped";
        packages[index][data.type].forEach((listener) => {
          listener(data);
        });
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
      key === "addEventListener" ||
      key === "removeEventListener"
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
    console.log(`${yellow(args._[0])}` + red(` not found, exiting\n`));
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
    console.log(
      `No provider specified, defaulting to ${yellow("coil-extension")}\n`
    );
    providerPackage = require("../utils/provider")("coil-extension");
  }

  // Get list of monetized packages
  monetization.packages = await require("../utils/list")(
    cwd,
    args.depth ? args.depth : 3
  );

  if (monetization.packages.length > 0) {
    console.log(
      `Monetizing ${yellow(monetization.packages.length)} packages\n`
    );
    await require(providerPackage.package).monetize(
      new Proxy(monetization, {
        set: () => {
          console.log("Not allowed to mutate values\n");
        },
        get(target, key, receiver) {
          if (key === "packages" || key === "invokeEventListener") {
            return Reflect.get(...arguments);
          } else {
            console.log(`Not allowed to access monetization.${key}\n`);
            return null;
          }
        },
      }),
      timeout
    );
  } else {
    console.log(`${yellow("0")} monetized packages found\n`);
  }
  console.log(green("Running application\n"));
  require(`${cwd}${args._[0]}`);
};
