// Display Monetized Package list

const { yellow, bold, black, bgWhite } = require("kleur");

const cwd = `${process.cwd()}/`;

module.exports = async (args) => {
  const monetized = await require("../utils/list")(
    cwd,
    args.depth ? args.depth : 3
  );
  console.log(`${yellow(monetized.length)} web monetized packages found\n`);
  if (args.expand) {
    for (let i = 0; i < monetized.length; i++) {
      console.log(
        `${bold("Name")} : ${yellow(monetized[i].name)}
  ${bold("Version")} : ${yellow(monetized[i].version)}
  ${bold("Wallet")} : ${yellow(monetized[i].webMonetization.wallet)}
        `
      );
    }
    //   For readability
    console.log();
  } else {
    console.log(
      `Execute ${bgWhite(
        black(" --expand ")
      )} along with list to get full list of web monetized packages\n`
    );
  }
};
