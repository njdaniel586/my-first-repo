import { ethers } from 'ethers';
import { useState } from 'react';




export default async function RequestAccount() {
    console.log('Requesting account...');
    const [walletAddress, setWalletAddress] = useState("");
    // ❌ Check if Meta Mask Extension exists 
    if(window.ethereum) {
      console.log('detected');
        try {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            console.log(accounts);
            setWalletAddress(accounts[0]);
        } catch (error) {
            console.log('Error connecting...');
        }

    } else {
      alert('Meta Mask not detected');
    }
}