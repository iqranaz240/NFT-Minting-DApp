require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require('dotenv').config();
require("@nomiclabs/hardhat-etherscan");

const { API_URL, PK, API_KEY} = process.env;

module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {}, 
    goerli: {
      url: API_URL,
      accounts: [`0x${PK}`]
    }
  }, 
  etherscan: {
    apiKey: API_KEY 
  },
};
