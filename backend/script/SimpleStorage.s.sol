// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script} from "forge-std/Script.sol";
import {SimpleStorage} from "../src/SimpleStorage.sol";
import {Storaage} from "../src/Storaage.sol";
import {HelperConfig} from "./HelperConfig.s.sol";


contract SimpleStorageDeploy is Script {

    function run() external returns(SimpleStorage, HelperConfig){
        HelperConfig helperConfig = new HelperConfig();
        (address owner, uint256 privateKey) = helperConfig.activeNetworkConfig();

        vm.startBroadcast(privateKey);
        SimpleStorage simpleStorage = new SimpleStorage(owner);
        Storaage storaage = new Storaage(owner);
        vm.stopBroadcast();
        return (simpleStorage, helperConfig);
    }
}