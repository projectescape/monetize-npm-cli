// Handle Login

module.exports = (args) => {
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
  const { login } = require(providerPackage.package);
  login();
};