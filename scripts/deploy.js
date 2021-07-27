const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  if (!deployer) throw "FATAL: Deployer account not set";
  console.log('Deployer:', deployer.address);

  const Sample = await hre.ethers.getContractFactory("ERC721Sample");
  const sample = await Sample.deploy();
  //const sample = await Sample.attach("0xAB70Ec86A21c2BC15a93492E59Fa7d646E581EF7");
  await sample.deployed();

  console.log("The contract deployed to:", sample.address);

  try {
    await hre.run("verify:verify", {
      address: sample.address,
      constructorArguments: []
    })
  } catch (err) {
    console.log("WARNING: Verification failed:", err);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
