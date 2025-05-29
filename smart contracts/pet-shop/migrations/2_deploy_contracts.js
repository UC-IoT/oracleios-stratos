// Help Truffle find `Coin.sol` in the `/contracts` directory
var Adoption = artifacts.require("Adoption");

module.exports = function(deployer) {
  // Command Truffle to deploy the Smart Contract
  deployer.deploy(Adoption);
};
