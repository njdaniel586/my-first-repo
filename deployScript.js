async function main () {
    // We get the contract to deploy
    const basicContractFactory = await ethers.getContractFactory('basicContract');
    console.log('Deploying basicContract...');
    const basicContract = await basicContractFactory.deploy();
    await basicContract.deployed();
    console.log('basicContract deployed to:', basicContract.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });