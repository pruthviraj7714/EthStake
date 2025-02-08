// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {OrcaCoin} from "../src/OrcaCoin.sol";

contract OrcaCoinTest is Test {
    OrcaCoin public orcacoin;

    function setUp() public {
        orcacoin = new OrcaCoin(address(this));
    }

    function testInitialSupply() public view {
        assert(orcacoin.totalSupply() == 0);
    }

    function test_RevertWhen_MintFromOthers() public {
        vm.startPrank(0xbf8Fa76704090a2139E53E29d9e2CDB8aA549986);
        vm.expectRevert("Unauthorized");
        orcacoin.mint(0xbf8Fa76704090a2139E53E29d9e2CDB8aA549986, 100);
    }

    function testMint() public {
        orcacoin.mint(0xbf8Fa76704090a2139E53E29d9e2CDB8aA549986, 10);
        assertEq(orcacoin.balanceOf(0xbf8Fa76704090a2139E53E29d9e2CDB8aA549986), 10);
    }

    function testChangeStakingContract() public {
        orcacoin.updateStakingContract(0xbf8Fa76704090a2139E53E29d9e2CDB8aA549986);
        vm.startPrank(0xbf8Fa76704090a2139E53E29d9e2CDB8aA549986);
        orcacoin.mint(0xbf8Fa76704090a2139E53E29d9e2CDB8aA549986, 100);
        assertEq(orcacoin.balanceOf(0xbf8Fa76704090a2139E53E29d9e2CDB8aA549986), 100);
    }
}
