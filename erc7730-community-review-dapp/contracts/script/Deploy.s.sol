// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/ERC7730CommunityReview.sol";

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);
        
        vm.startBroadcast(deployerPrivateKey);
        
        ERC7730CommunityReview reviewContract = new ERC7730CommunityReview();
        
        console.log("ERC7730CommunityReview deployed at:", address(reviewContract));
        console.log("Deployer:", deployer);
        
        vm.stopBroadcast();
    }
}
