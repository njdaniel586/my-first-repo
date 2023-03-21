// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.9;
import "hardhat/console.sol";

contract basicContract {
    string public contractName = "Basic Contract";
    int public cookieSupply = 20;

    address public owner;

    struct homie {
        string name;
        uint cookies;
    }

    mapping(address => homie) public homieMapping;
    
    event newRegistration(string newName);
    event newCookie(uint newCookieCount);

    constructor() {
        owner = msg.sender;
    }

    function homieRegister(string memory _name) public {
        homieMapping[msg.sender].name = _name; 
        homieMapping[msg.sender].cookies = 0; 
        emit newRegistration(_name);
    }

    function getCookie() public{
        homieMapping[msg.sender].cookies ++;
        cookieSupply--;
        console.log("This is a test of solidity log getCookie");
        emit newCookie(homieMapping[msg.sender].cookies);
    }

}