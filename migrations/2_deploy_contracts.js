var USDT = artifacts.require("./usdt.sol");

module.exports = function(deployer) {
  deployer.deploy(USDT, { gas: 4000000 });
};
