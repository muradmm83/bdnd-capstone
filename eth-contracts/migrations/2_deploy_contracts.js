// migrating the appropriate contracts
var MMMakhashinERC721Token = artifacts.require("MMMakhashinERC721Token");
var SquareVerifier = artifacts.require("Verifier");
var SolnSquareVerifier = artifacts.require("SolnSquareVerifier");

module.exports = async (deployer, network) => {
  if (network === 'development') {
    await deployer.deploy(MMMakhashinERC721Token);
  }
  
  await deployer.deploy(SquareVerifier);
  await deployer.deploy(SolnSquareVerifier, SquareVerifier.address);
};