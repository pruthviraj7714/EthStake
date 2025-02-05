// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import { OrcaCoin } from "../src/OrcaCoin.sol";

contract CounterScript is Script {
    OrcaCoin public orcacoin;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        orcacoin = new OrcaCoin(0xbf8Fa76704090a2139E53E29d9e2CDB8aA549986);

        vm.stopBroadcast();
    }
}
