// Display Monetized Package list

const cwd = `${process.cwd()}/`;

module.exports = async (args) => {
  const monetized = await require("../utils/list")(
    cwd,
    args.depth ? args.depth : 3
  );
  console.log(`${monetized.length} web monetized packages found\n`);
  if (args.expand) {
    for (let i = 0; i < monetized.length; i++) {
      console.log(
        `Name : ${monetized[i].name}, Wallet : ${monetized[i].webMonetization.wallet}`
      );
    }
    //   For readability
    console.log();
  } else {
    console.log(
      "Execute --expand along with list to get full list of web monetized packages\n"
    );
  }
};
