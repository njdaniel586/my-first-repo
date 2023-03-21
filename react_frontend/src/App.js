import './App.css';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { contractABI } from './contractABI';

const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

function App() {

  const [provider, setProvider] = useState(new ethers.providers.Web3Provider(window.ethereum));
  var signer = provider.getSigner();
  var userAddress = signer.getAddress();
  var basicContract = new ethers.Contract(contractAddress,contractABI,provider);


  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [contractName, setContractName] = useState("");
  const [cookieSupply, setCookieSupply] = useState("");
  const [ownedCookies, setOwnedCookies] = useState ("");
  const [ownerAddress, setOwnerAddress] = useState("");
  const [inputNameData, setinputNameData] = useState("");
  const [contractLoaded, setContractLoaded] = useState(false);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    const handleNewRegistration = (updatedNewName) => {
      setNewName(updatedNewName);
    };
    basicContract.on("newRegistration", handleNewRegistration);
    
    // Add cleanup function to remove the event listener
    return () => {
      basicContract.off("newRegistration", handleNewRegistration);
    };
  }, []);

  useEffect(() => {
    const handleNewCookie = async (updatedNewCookie) => {
      setOwnedCookies(String(updatedNewCookie));
      setCookieSupply(String(await basicContract.cookieSupply()));
    };
    basicContract.on("newCookie", handleNewCookie);
    
    // Add cleanup function to remove the event listener
    return () => {
      basicContract.off("newCookie", handleNewCookie);
    };
  }, []);


  useEffect(() => {
      const handleAccountsChanged = () => {
      console.log("Handling accounts change!");
      connectWallet();
      connectContract();
    };

    new ethers.providers.Web3Provider(window.ethereum).provider.on('accountsChanged', handleAccountsChanged);
    return() => {
      provider.off("accountsChanged", handleAccountsChanged);
    };
  }, []);


async function requestAccount() {
    console.log('Requesting account...');
    
    // ❌ Check if Meta Mask Extension exists 
    if(window.ethereum) {
      console.log('detected');
        try {
            const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
            console.log("accounts[0]: ",accounts[0]);
            setWalletAddress(accounts[0]);
            console.log("userAddress: ",userAddress);
            console.log("contractABI: ",contractABI);
        } catch (error) {
            console.log('Error connecting...',error);
        }

    } else {
      alert('Meta Mask not detected');
    }
}

async function connectWallet() {
  if(window.ethereum) {
    await requestAccount();

    const accounts_ = await provider.send("eth_requestAccounts", []);
    setWalletAddress(accounts_[0]);
    console.log("provider accounts: ",accounts_);
    const accountBalance = await provider.getBalance(accounts_[0]);
    console.log("Account Balance: ",String(ethers.utils.formatEther(accountBalance)),"ether");
    setBalance(String(ethers.utils.formatEther(accountBalance)));
  }
}

async function connectContract() {
  const basicContract = new ethers.Contract(contractAddress,contractABI,provider);
  const nameOfContract = await basicContract.contractName();
  setContractName(await basicContract.contractName());
  console.log("contractName: ",nameOfContract);

  const supplyOfCookies = await basicContract.cookieSupply();
  setCookieSupply(String(await basicContract.cookieSupply()));
  console.log("cookieSupply: ",String(supplyOfCookies));

  const addressOfOwner = await basicContract.owner();
  setOwnerAddress(String(await basicContract.owner()));
  console.log("Owner Address: ",String(addressOfOwner));


  const accounts_ = await provider.send("eth_requestAccounts", []);
  setWalletAddress(accounts_[0]);

  setContractLoaded(true);
  console.log("walletAddress before ENS error: ", walletAddress);
  const mappingInfoFromContract = await basicContract.homieMapping(accounts_[0]);
  const [name, cookies] = mappingInfoFromContract;
  setNewName(name);
  setOwnedCookies(String(cookies));
  console.log("name: ", name);
  console.log("cookies: ", String(cookies));

}

async function homieRegister() {
  console.log("Submit Registration:" ,inputNameData);
  const basicContract = new ethers.Contract(contractAddress,contractABI,signer);
  await basicContract.homieRegister(inputNameData);
}

const handleInputNameData = (event) => {
  setinputNameData(event.target.value)
}


async function getCookie() {
  const basicContract = new ethers.Contract(contractAddress,contractABI,signer);
  await basicContract.getCookie();
  connectContract();
}

  return (
    <div>
      <div>
        <br></br>
        <button onClick={() => connectWallet(walletAddress)}>
          Connect Wallet
        </button>
        <h3>Wallet Address: {walletAddress}</h3>
        Balance in ether: {balance}
      </div>
      <div>
        <br/>
        <br/>
        <button onClick={() => connectContract()}>
          {contractLoaded ? "Connected!" : "Connect to Contract"}
        </button>
        <br/>
        {contractLoaded && 'Contract Name: '}{contractName}
        <br/>
        {contractLoaded && 'Contract Address: '}{contractName && contractAddress}
        <br/>
        {contractLoaded && 'Cookie Supply: '}{contractLoaded && cookieSupply}
        <br/>
        {contractLoaded && 'Owner Address: '}{ownerAddress}
        <br/>
        {contractLoaded && 'User: '} {contractLoaded && newName ? contractLoaded && newName : contractLoaded && "Unregistered"}
        <br/>
        {contractLoaded && newName ? "Cookies Owned: " : ""}{contractLoaded && newName ? ownedCookies : ""}
    
      </div>

      <div>
        {contractLoaded ?( 
          <div>
          <p>Please Register as a Homie: </p>
          <input type="text" value={inputNameData} onChange={handleInputNameData}/>
          <button onClick={homieRegister}>{newName ? "Change Name" : "Register"}</button>
          <br/>
          <br/>
          {newName ? <button onClick={() => getCookie()}>Get A Cookie</button> : "no cookies"}
          </div>
        ) : (
          "Not loaded yet"
        )
        }
      </div>

    </div>
  );
}

export default App;
