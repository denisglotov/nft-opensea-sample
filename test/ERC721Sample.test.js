const { expect } = require("chai");

describe("ERC721", function() {
  let nft;

  beforeEach("deploy", async function() {
    const Nft = await ethers.getContractFactory("ERC721Sample");
    nft = await Nft.deploy();
    await nft.deployed();
  });
  
  it("mints", async function () {
    const [ deployer, owner ] = await ethers.getSigners();
    await nft.connect(deployer).mint(owner.address, 1, "123");
    expect(await nft.balanceOf(owner.address)).to.equal(1);
    expect(await nft.ownerOf(1)).to.equal(owner.address);
    expect(await nft.tokenURI(1)).to.equal("ipfs://123");
  });
});
