// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {Test, console} from "forge-std/Test.sol";
import {SimpleStorage} from "../src/SimpleStorage.sol";
import {SimpleStorageDeploy} from "../script/SimpleStorage.s.sol";
import {HelperConfig} from "../script/HelperConfig.s.sol";
import {StdInvariant} from "forge-std/StdInvariant.sol";

contract SimpleStorageTest is  StdInvariant, Test {
     event valueChanged(uint256 oldValue, uint256 newValue, address who);

    SimpleStorage simpleStorage;
    HelperConfig helperConfig;

    address owner;
    uint256 ownerPrivateKey;
    address public USER1 = makeAddr("user");

    function setUp() external {

        SimpleStorageDeploy deployer = new SimpleStorageDeploy();
        (simpleStorage, helperConfig) = deployer.run();
        (owner, ownerPrivateKey) = helperConfig.activeNetworkConfig();
        targetContract(address(simpleStorage));
    }

    function testShouldSetRightConfigOwner() public{
        (owner, ownerPrivateKey) = helperConfig.activeNetworkConfig();
        assertEq(owner, vm.envAddress("ADDRESS_WALLET_ANVIL"));
    }

    function testShouldSetRightConfigPrivateKey() public{
        (owner, ownerPrivateKey) = helperConfig.activeNetworkConfig();
        assertEq(ownerPrivateKey, vm.envUint("PRIVATE_KEY_WALLET_ANVIL"));
    }

    /////////////////
    // DEPLOYMENT  //
    /////////////////

    function testShouldSetRightOwner() public{
        assertEq(simpleStorage.owner(), owner);
    }

    function testShouldSetRightInitialeValue() public {
        assertEq(simpleStorage.get(), 0);
    }

    //////////
    // GET  //
    //////////

    function testShouldGetRightValue() public{
        simpleStorage.set(1);
        assertEq(simpleStorage.get(), 1);
    }

    //////////
    // SET  //
    //////////

    function testShouldSetRightValueFromOwner() public{
        simpleStorage.set(2);
        assertEq(simpleStorage.get(), 2);
    }

    function testShouldSetRightValueFromAnotherAddress() public{
        vm.prank(USER1);
        simpleStorage.set(2);
        assertEq(simpleStorage.get(), 2);
    }

    function testShouldEmitEventWhenValueSet() public{
        vm.prank(USER1);
        vm.expectEmit(true, false, false, false, address(simpleStorage));
        emit valueChanged(0, 1, USER1);
        simpleStorage.set(1);
    }

    ////////////////
    // FUZZ TEST  //
    ////////////////

    /** 
     * @notice State less Fuzz test to set the stored value
     * Fuzzing Tests = Stateless fuzzing = Random Data to one function
     */
    function testFuzzStateless_SetStoredValue(uint256 x) public {
        simpleStorage.set(x);
        assertEq(simpleStorage.get(), x);
    }

    /////////////////////
    // INVARIANT TEST  //
    /////////////////////
    
    /** 
     * @notice Invariant test to set the stored value
     * Invariant Tests = Stateful fuzzing = Random Data and Random function calls to many functions
     */
    function testInvariant_SetStoredValue(uint256 x) public {
        simpleStorage.set(x);
        assertEq(simpleStorage.get(), x);
    }
}
