// Handle Login

const { yellow } = require("kleur");

module.exports = (args) => {
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
  const { login } = require(providerPackage.package);
  login();
};
