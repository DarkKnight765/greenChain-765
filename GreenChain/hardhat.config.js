// filepath: c:\Users\vedan\OneDrive\Desktop\hardhat starter\hardhat.config.js
require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  paths:{
    sources:"./contracts",
    tests:"./test",
    cache:"./cache",
    artifacts:"./artifacts"
  },
  networks:{
    hardhat:{
      chainId:1337
    },
    sepolia:{
      url:"https://sepolia.infura.io/v3/1b6b6737c5ee400ab680b7ad31fd67ea",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    }
  },
};