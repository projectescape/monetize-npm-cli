// This can be used to return different packages for supported providers

const { yellow } = require("kleur");

const providers = [
  { name: "coil-extension", package: "wrapper-coil-extension" },
];

const providePackage = (name) => {
  for (let i = 0; i < providers.length; i++) {
    if (name === providers[i].name) {
      return providers[i];
    }
  }
  console.log(
    `No provider named ${yellow(
      name
    )} found. If you think this is a problem, please raise an issue on github`
  );
  console.log(`Defaulting to ${yellow("coil-extension")} as provider\n`);
  return providers[0];
};

module.exports = providePackage;
