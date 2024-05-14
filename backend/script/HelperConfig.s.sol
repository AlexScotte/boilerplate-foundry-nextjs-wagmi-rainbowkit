// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script} from "forge-std/Script.sol";
import {SimpleStorage} from "../src/SimpleStorage.sol";

contract HelperConfig is Script {
   struct NetworkConfig{
        address owner;
        uint256 privateKey;
   }

    NetworkConfig public activeNetworkConfig;

    constructor(){

        if(block.chainid == 11155111){
            // If sepolia network
            activeNetworkConfig = getSepoliaConfig();
        }
        else{
            activeNetworkConfig = getLocalConfig();
        }
    }

   function getLocalConfig() private view returns(NetworkConfig memory){
       return NetworkConfig(
        {
            owner: vm.envAddress("ADDRESS_WALLET_ANVIL"),
            privateKey: vm.envUint("PRIVATE_KEY_WALLET_ANVIL")
        });
   }

   function getSepoliaConfig() private view returns(NetworkConfig memory){
       return NetworkConfig(
        {
            owner: vm.envAddress("ADDRESS_WALLET_PROD"),
            privateKey: vm.envUint("PRIVATE_KEY_WALLET_PROD")
        });
   }
}