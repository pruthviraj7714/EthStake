// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {StakingContract, ItokenAddress} from "../src/StakingContract.sol";

contract MockToken is ItokenAddress {
    mapping(address => uint256) public balances;

    function mint(address _account, uint _amount) external override {
        balances[_account] += _amount;
    }
}

contract StakingContractTest is Test {
    StakingContract public stakingContract;

    function setUp() public {
        MockToken mockToken = new MockToken();
        stakingContract = new StakingContract(address(mockToken));
    }

    function testStake() public {
        vm.startPrank(0xbf8Fa76704090a2139E53E29d9e2CDB8aA549986);
        vm.deal(0xbf8Fa76704090a2139E53E29d9e2CDB8aA549986, 200);
        stakingContract.stake{value: 200}();
        assertEq(
            stakingContract.balanceOf(
                0xbf8Fa76704090a2139E53E29d9e2CDB8aA549986
            ),
            200
        );
    }

    function testUnStake() public {
        vm.startPrank(0xbf8Fa76704090a2139E53E29d9e2CDB8aA549986);
        vm.deal(0xbf8Fa76704090a2139E53E29d9e2CDB8aA549986, 200);
        stakingContract.stake{value: 200}();
        stakingContract.unStake(100);
        assertEq(
            stakingContract.balanceOf(
                0xbf8Fa76704090a2139E53E29d9e2CDB8aA549986
            ),
            100
        );
    }

    function testFailUnStake() public {
        stakingContract.stake{value: 200}();
        stakingContract.unStake(400);
    }

    function testGetReward() public {
        vm.startPrank(0xbf8Fa76704090a2139E53E29d9e2CDB8aA549986);
        vm.deal(0xbf8Fa76704090a2139E53E29d9e2CDB8aA549986, 10);
        stakingContract.stake{value: 4}();
        vm.warp(block.timestamp + 1);
        assertEq(
            stakingContract.getRewards(
                0xbf8Fa76704090a2139E53E29d9e2CDB8aA549986
            ),
            4
        );
    }

    function testGetComplexReward() public {
        vm.startPrank(0xbf8Fa76704090a2139E53E29d9e2CDB8aA549986);
        vm.deal(0xbf8Fa76704090a2139E53E29d9e2CDB8aA549986, 10);
        stakingContract.stake{value: 4}();
        vm.warp(block.timestamp + 1);
        stakingContract.unStake(2);
        vm.warp(block.timestamp + 2);
        assertEq(
            stakingContract.getRewards(
                0xbf8Fa76704090a2139E53E29d9e2CDB8aA549986
            ),
            8
        );
    }

    function testClaimRewards() public {
        vm.startPrank(0xbf8Fa76704090a2139E53E29d9e2CDB8aA549986);
        vm.deal(0xbf8Fa76704090a2139E53E29d9e2CDB8aA549986, 10);
        stakingContract.stake{value: 4}();
        vm.warp(block.timestamp + 1);
        stakingContract.claimRewards();
        stakingContract.unStake(4);
        assertEq(
            stakingContract.balanceOf(
                0xbf8Fa76704090a2139E53E29d9e2CDB8aA549986
            ),
            0
        );
    }

    function testClaimRewards2() public {
        vm.startPrank(0xbf8Fa76704090a2139E53E29d9e2CDB8aA549986);
        vm.deal(0xbf8Fa76704090a2139E53E29d9e2CDB8aA549986, 10);
        stakingContract.stake{value: 5}();
        vm.warp(block.timestamp + 1);
        assertEq(
            stakingContract.getRewards(
                0xbf8Fa76704090a2139E53E29d9e2CDB8aA549986
            ),
            5
        );
        stakingContract.claimRewards();
        assertEq(
            stakingContract.getRewards(
                0xbf8Fa76704090a2139E53E29d9e2CDB8aA549986
            ),
            0
        );
        stakingContract.stake{value: 5}();
        vm.warp(block.timestamp + 2);
        assertEq(
            stakingContract.getRewards(
                0xbf8Fa76704090a2139E53E29d9e2CDB8aA549986
            ),
            20
        );
    }
}
