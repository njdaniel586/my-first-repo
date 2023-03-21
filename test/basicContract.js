const { ethers } = require("hardhat");
const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("basicContract", function(){
    async function deployBasicContractFixture(){
        const owner_ = await ethers.getSigner();
        const signers_ = await ethers.getSigners();
        
        const basicContractFactory = await ethers.getContractFactory("basicContract");
        const basicContract = await basicContractFactory.deploy();
        await basicContract.deployed();

        console.log("basicContract was deployed!");
        console.log("Owner address: ",owner_.address);
        return{basicContractFactory,basicContract,owner_,signers_};
    }
    it("Upon deployment, cookieSupply should be 20", async function(){
        const {basicContractFactory,basicContract,owner_,signers_} = await loadFixture(deployBasicContractFixture);
        expect(await basicContract.cookieSupply()).to.equal(20);
    });

    it("Someone should be able to register and start with 0 cookies", async function(){
        const {basicContractFactory,basicContract,owner_,signers_} = await loadFixture(deployBasicContractFixture);
        await expect(await basicContract.connect(signers_[1]).homieRegister("Matt")).to.not.be.reverted;
        
        console.log("Name: ",(await basicContract.homieMapping(signers_[1].address)).name);
       
        expect((await basicContract.homieMapping(signers_[1].address)).name).to.be.equal("Matt");
    });

    it("People should be able to get cookies", async function(){
        const {basicContractFactory,basicContract,owner_,signers_} = await loadFixture(deployBasicContractFixture);
        await basicContract.connect(signers_[1]).homieRegister("Matt");
        await basicContract.connect(signers_[1]).getCookie();
        await basicContract.connect(signers_[1]).getCookie();
        await basicContract.connect(signers_[1]).getCookie();
        expect((await basicContract.homieMapping(signers_[1].address)).cookies).to.be.equal(3);
    });
})