// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import {SismoConnectModule} from "src/SismoConnectModule.sol";

contract DeployZKDrop is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        address _safe = 0x0911BA4aE8D1cbC39A3f42bC9F91B06c0d681609;
        bytes16 _appId = 0x11627eb6dd3358f8f4434a94bd15e6c5;
        bytes16 _groupId = 0x8837536887a7f6458977b10cc464df4b;

        new SismoConnectModule(_safe, _appId, _groupId);

        vm.stopBroadcast();
    }
}
