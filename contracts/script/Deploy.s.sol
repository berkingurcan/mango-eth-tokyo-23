// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import {SismoConnectModule} from "src/SismoConnectModule.sol";

contract DeployZKDrop is Script {
    function run() external {
        vm.startBroadcast();

        address _safe = 0x0911BA4aE8D1cbC39A3f42bC9F91B06c0d681609;
        bytes16 _appId = 0x282ff775a754ebea339746f096635a5a;
        bytes16 _groupId = 0x84f8495423ea1aa1b212356f31f6c7d9;

        SismoConnectModule sismoConnectModule = new SismoConnectModule(_safe, _appId, _groupId);
        console.log("sismoconnectmodule delpoyed to", address(sismoConnectModule));
        vm.stopBroadcast();
    }
}
