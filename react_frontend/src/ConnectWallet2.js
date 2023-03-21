import { useState } from 'react';
import { ethers } from 'ethers';
import App from './App';

export default function ConnectWallet2({walletAddress2}) {
    //const [walletAddress, setWalletAddress] = useState("");
    //const walletAddress = 0;
    async function requestAccount2() {
        console.log('Requesting account...');
    
        // ❌ Check if Meta Mask Extension exists 
        if(window.ethereum) {
          console.log('detected');
            try {
                const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
                console.log("accounts: ",accounts);
                //setWalletAddress(accounts[0]);
                walletAddress2 = accounts[0];
            } catch (error) {
                console.log('Error connecting...');
            }
    
        } else {
          alert('Meta Mask not detected');
        }
    }

    async function connect() {
        if(window.ethereum) {
          await requestAccount2();
          const provider = new ethers.providers.Web3Provider(window.ethereum);
      
        }
      }



      return (
        requestAccount2,
        walletAddress2
      );
}

