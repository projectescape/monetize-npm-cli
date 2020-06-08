const { bgWhite, black } = require("kleur");

const help = () => {
  console.log(
    `monetize-npm-cli is a CLI that helps monetize npm packages using the Web Monetization API using different providers

The following flags are listed according to thier priority order
(All Provider related flags are in capital)

${bgWhite(black(" --help "))} , ${bgWhite(black(" -h "))}
Displays the help page that you are viewing right now

${bgWhite(black(" --login "))} , ${bgWhite(black(" -L "))} 
    ${bgWhite(black(" --provider "))},${bgWhite(
      black(" -P ")
    )} (Defaults to coil-extension if not provided/matched)
Login into your web monetization provider.

${bgWhite(black(" --logout "))}
    ${bgWhite(black(" --provider "))},${bgWhite(
      black(" -P ")
    )} (Defaults to coil-extension if not provided/matched)
Logout from your web monetization provider.

${bgWhite(black(" --list "))} , ${bgWhite(black(" -l "))} 
    ${bgWhite(black(" --depth "))} (Defaults to 3)
    ${bgWhite(black(" --expand "))} (Default false)
Lists the number of packages installed which support web monetization.
Depth is the number of previous directories package.json will be searched for if not found in the current working directory.
Expand is used to list the names and version of pacages.

${bgWhite(black(" --version "))} , ${bgWhite(black(" -v "))}
Returns name and version

${bgWhite(black(" File path given "))}
    ${bgWhite(black(" --provider "))} , ${bgWhite(
      black(" -P ")
    )} (Defaults to coil-extension if not provided/matched)
    ${bgWhite(black(" --timeout "))} , ${bgWhite(
      black(" -T ")
    )} (defines how much time is spent on monetizing one package in queue. Can be ignored by provider)
    ${bgWhite(black(" --depth "))} (Defaults to 3)
Used to run an application while monetizing the packages it is using and providing a globalThis.monetization object to interact with

${bgWhite(black(" Default "))}
Help page
`
  );
};

module.exports = help;
