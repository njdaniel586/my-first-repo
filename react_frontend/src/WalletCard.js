import React, { useState } from 'react';
//import detectEthereumProvider from '@metamask/detect-provider';
//import { Button } from '@material-ui/core';
//import Ethereum from './Ethereum.png'
import { ethers } from 'ethers';
console.log("window.ethereum before: ", window.ethereum);
//const provider = (ethers.providers.getDefaultProvider());
//provider = new ethers.providers.Web3Provider(window.Ethereum);

const provider = ((window.ethereum != null) ? new ethers.providers.Web3Provider(window.ethereum, "any") : ethers.providers.getDefaultProvider());

console.log("window.ethereum after: ", window.ethereum);

const WalletCard = () => {
    
    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [userBalance, setUserBalance] = useState(null);
    const connectwalletHandler = () => {
        //const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
        console.log("connectwalletHandler start. window.ethereum = ", window.ethereum)
        if (window.Ethereum) {
            console.log("connectwalletHandler window.etherum is true");
            provider.send("eth_requestAccounts", []).then(async () => {
                await accountChangedHandler(provider.getSigner());
                
            })
        } else {
            setErrorMessage("Please Install Metamask!!!");
        }
    }
    const accountChangedHandler = async (newAccount) => {
        const address = await newAccount.getAddress();
        setDefaultAccount(address);
        const balance = await newAccount.getBalance()
        setUserBalance(ethers.utils.formatEther(balance));
        await getuserBalance(address)
    }
    const getuserBalance = async (address) => {
        //const balance = await provider.getBalance(address, "latest")
    }
    return (
        <div className="WalletCard">
            {/* <img src={Ethereum} className="App-logo" alt="logo" /> */}
            <h3 className="h4">
                Welcome to a decentralized Application
            </h3>
            <button
                onClick={connectwalletHandler}>
                {defaultAccount ? "Connected!!" : "Connect"}
            </button>
            <div>
                <h4>Address:{defaultAccount}</h4>
                <div>
                    <h3>
                        Wallet Amount: {userBalance}
                    </h3>
                </div>
            </div>
            {errorMessage}
        </div>
    )
}
export default WalletCard;