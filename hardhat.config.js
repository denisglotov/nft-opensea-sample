const fs = require("fs");
const path = require("path");

require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

function readJson(name) {
  try {
    return JSON.parse(fs.readFileSync(path.join(__dirname, name)).toString());
  } catch (err) {
    console.log(`WARNING: no ${name} found.`);
    return {}
  }
};

const secrets = readJson(".secrets.json");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/" + secrets.infura_key,
      accounts: secrets.accounts || [],
    }
  },
  etherscan: {
    apiKey: secrets.etherscan_key,
  },
  solidity: {
    version: "0.8.6",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
