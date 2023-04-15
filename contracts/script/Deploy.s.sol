// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import {ZKDropERC721} from "src/ZKDropERC721.sol";

contract DeployZKDrop is Script {
    bytes16 immutable APP_ID = 0x112a692a2005259c25f6094161007967;
    bytes16 immutable MERGOOOR_CONTRIBUTOR_GROUP_ID = 0x42c768bb8ae79e4c5c05d3b51a4ec74a;

    function run() public {
        vm.startBroadcast();
        ZKDropERC721 zkdrop =
        new ZKDropERC721({appId: APP_ID, groupId: MERGOOOR_CONTRIBUTOR_GROUP_ID, name: "Mergooor Pass", symbol: "MP", baseTokenURI: "ipfs://QmPR9q3Q5fByxzfMfRp32azvH2UPXhPoDFhHWAsiGNHBwS"});
        console.log("zkdrop deployed at", address(zkdrop));
        vm.stopBroadcast();
    }
}
