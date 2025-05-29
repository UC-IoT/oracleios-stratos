var Summon = artifacts.require("Summon");

module.exports = function (deployer) {
  deployer.deploy(Summon, "0x12f2d6b0783127c62956fff73f4d7f701433b6f5");
};
