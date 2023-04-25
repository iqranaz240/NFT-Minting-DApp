const {expect, assert} = require("chai");
const { ethers, waffle } = require("hardhat");

describe("NFT Minting Contract ⏱", function () {
    let owner, ad1, ad2, ad3;
    let Collection;
    
    beforeEach(async function () {
      [
        owner,
        ad1,
        ad2,
        ad3,
        ...addrs
      ] = await ethers.getSigners();
  
      Collection = await ethers.getContractFactory("Collection");
      Collection = await Collection.deploy();
    });
  
    it("Deploy Contracts", async function () {
     assert.ok(Collection.address);
    });
  
    describe("Collection Contract Set Parameters", function () {
  
      let price = ethers.utils.parseEther("0.0004");
      let limit =  5; 
      let max_supply = 2000;
  
    it("Should Set NFT Price", async function () {
      await Collection.setPrice(price);
      expect(await Collection.PRICE_PER_TOKEN()).to.equal(price);
    });
  
    it("Should Set Minting Limit per Address", async function () {
      await Collection.setLimit(limit)
      expect(await Collection.LIMIT_PER_ADDRESS()).to.equal(limit);
    });
  
    it("Should Set Max NFT Supply", async function () {
      await Collection.setMaxSupply(max_supply)
      expect(await Collection.MAX_SUPPLY()).to.equal(max_supply);
    });
  });
  
  describe("Collection Contract Mint NFT", function () {
    it("Should Mint NFT to User Account Address", async function () {
      let price = ethers.utils.parseEther("0.0001");
      let user = await Collection.connect(ad1);
      await user.mintNFT("1", { value: price });
      expect(await Collection._tokenIds()).to.equal(1);
      expect(await Collection._totalMinted()).to.equal(1);
    });
  });
  
  describe("Withdraw Money by Owner", function () {
    it("Should Withdraw Money to Owner Account Address", async function () {
      let Owner = await Collection.connect(owner);
      await Owner.withdrawMoney();
      const balance = await ethers.provider.getBalance(Collection.address);
      expect(balance).to.equal(0);
    });
  
    it("Should Not Withdraw Money to Any Other Account Address", async function () {
      let User = await Collection.connect(ad2);
      await expect (User.withdrawMoney()).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });
  });
  
  