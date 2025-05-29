const PrivateKeyProvider = require("@truffle/hdwallet-provider");

// insert the private key of the account used in metamask eg: Account 1 (Miner Coinbase Account)
// const privateKey =
//   "c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3";

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "0.0.0.0",
      port: 8545,
      network_id: "*", // Match any network id
    },
    develop: {
      port: 8545,
    },
    // quickstartWallet: {
    //   provider: () =>
    //     new PrivateKeyProvider(privateKey, "http://0.0.0.0:8545"),
    //   network_id: "*",
    // },
  },
  compilers: {
    solc: {
      version: "0.8.16", // ex:  "0.4.20". (Default: Truffle's installed solc)
    },
  },
};
