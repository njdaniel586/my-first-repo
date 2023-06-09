import React, { Component } from 'react';

import ERC20_ABI from "./ERC20_ABI.json";

import { ethers } from "ethers";

class Metamask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      block: -1
    };
  }

  async connectToMetamask() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const accounts = await provider.send("eth_requestAccounts", []);
    const balance = await provider.getBalance(accounts[0]);
    const balanceInEther = ethers.utils.formatEther(balance);
    const block = await provider.getBlockNumber();

    provider.on("block", (block) => {
      this.setState({ block })
    })


    console.log("accounts[0]; ", accounts[0]);
    this.setState({ selectedAddress: accounts[0], balance: balanceInEther, block,});
  }

 
  renderMetamask() {
    console.log("selectedAddress: ", this.state.selectedAddress)
    console.log("block: ", this.state.block)
    if (!this.state.selectedAddress) {
      return (
        <button onClick={() => this.connectToMetamask()}>Connect to Metamask</button>
      )
    } else {
      return (
        <div>
          <p>Welcome {this.state.selectedAddress}</p>
          <p>Your ETH Balance is: {this.state.balance}</p>
          <p>Current ETH Block is: {this.state.block}</p>
          <p>Balance of {this.state.tokenName} is: {this.state.tokenBalanceInEther}</p>
        </div>
      );
    }
  }

  render() {
    return(
      <div>
        {this.renderMetamask()}
      </div>
    )
  }
}

export default Metamask;