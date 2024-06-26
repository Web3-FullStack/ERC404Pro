import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import './lib/global';
import networks from './networks/index'

// require("@nomiclabs/hardhat-waffle")
// require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
// require("solidity-coverage")
require("hardhat-gas-reporter")
require("hardhat-contract-sizer")
require("./tasks")
require("dotenv").config({path: `${__dirname}/.env`})

const MAINNET_RPC_URL =
  process.env.MAINNET_RPC_URL ||
  process.env.ALCHEMY_MAINNET_RPC_URL ||
  "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
const POLYGON_MAINNET_RPC_URL =
  process.env.POLYGON_MAINNET_RPC_URL || "https://polygon-mainnet.alchemyapi.io/v2/your-api-key"
const GOERLI_RPC_URL =
  process.env.GOERLI_RPC_URL || "https://eth-goerli.alchemyapi.io/v2/your-api-key"
const PRIVATE_KEY = process.env.PRIVATE_KEY
// optional
const MNEMONIC = process.env.MNEMONIC || "Your mnemonic"
const FORKING_BLOCK_NUMBER = process.env.FORKING_BLOCK_NUMBER

// Your API key for Etherscan, obtain one at https://etherscan.io/
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "Your etherscan API key"
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY || "Your polygonscan API key"
const REPORT_GAS = process.env.REPORT_GAS || false

const config: HardhatUserConfig = {
  defaultNetwork: process.env.NETWORK,
  networks,
  // defaultNetwork: process.env.NETWORK || 'localhost',
  // networks: {
  //   hardhat: {
  //     hardfork: "merge",
  //     // If you want to do some forking set `enabled` to true
  //     forking: {
  //       url: MAINNET_RPC_URL,
  //       blockNumber: FORKING_BLOCK_NUMBER,
  //       enabled: false,
  //     },
  //     chainId: 31337,
  //   },
  //   localhost: {
  //     chainId: 31337,
  //   },
  //   // goerli: {
  //   //   url: GOERLI_RPC_URL,
  //   //   accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
  //   //   //   accounts: {
  //   //   //     mnemonic: MNEMONIC,
  //   //   //   },
  //   //   saveDeployments: true,
  //   //   chainId: 5,
  //   // },
  //   // mainnet: {
  //   //   url: MAINNET_RPC_URL,
  //   //   accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
  //   //   //   accounts: {
  //   //   //     mnemonic: MNEMONIC,
  //   //   //   },
  //   //   saveDeployments: true,
  //   //   chainId: 1,
  //   // },
  //   // polygon: {
  //   //   url: POLYGON_MAINNET_RPC_URL,
  //   //   accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
  //   //   saveDeployments: true,
  //   //   chainId: 137,
  //   // },
  // },
  etherscan: {
    // yarn hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
    apiKey: {
      polygon: POLYGONSCAN_API_KEY,
      goerli: ETHERSCAN_API_KEY
    },
  },
  gasReporter: {
    enabled: REPORT_GAS,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
    // coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
  contractSizer: {
    runOnCompile: false,
    only: ["APIConsumer", "KeepersCounter", "PriceConsumerV3", "RandomNumberConsumerV2"],
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
    feeCollector: {
      default: 1,
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.9",
      },
      {
        version: "0.8.7",
      },
      {
        version: "0.6.6",
      },
      {
        version: "0.4.24",
      },
    ],
  },
  mocha: {
    timeout: 200000, // 200 seconds max for running tests
  },
};

export default config;
