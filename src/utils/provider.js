// This can be used to return different packages for supported providers

const providers = [{ name: "coil", package: "wrapper-coil-extension" }];

const providePackage = (name) => {
  for (let i = 0; i < providers.length; i++) {
    if (name === providers[i].name) {
      return providers[i];
    }
  }
  console.log(
    `No provider named ${name} found. If you think this is a problem, please raise an issue on github`
  );
  console.log("Defaulting to Coil for provider\n");
  return providers[0];
};

module.exports = providePackage;
