// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol";
import "@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol";
import "./IL2ERC721Bridge.sol";
import "@matterlabs/zksync-contracts/l2/contracts/L2ContractHelper.sol";

contract L2ERC721Bridge is IL2ERC721Bridge, Initializable {
    UpgradeableBeacon public l2TokenBeacon;
    address public l1Bridge;

    function initialize(
        address _l1Bridge,
        address _l2TokenImplementation,
        address _governor
    ) public initializer {
        require(_l1Bridge != address(0) && _l2TokenImplementation != address(0), "Invalid addresses");
        l1Bridge = _l1Bridge;
        l2TokenBeacon = new UpgradeableBeacon(_l2TokenImplementation);
        l2TokenBeacon.transferOwnership(_governor);
    }

    function finalizeDeposit(uint256 tokenId, address l1Token, address to) external override {
        require(msg.sender == l1Bridge, "Only L1 bridge can call");
        bytes32 salt = keccak256(abi.encodePacked(l1Token));
        address l2Token = L2ContractHelper.computeCreate2Address(
            address(this),
            salt,
            l2TokenBeacon.implementation(),
            ""  // Assuming no constructor arguments needed, adjust if necessary
        );
        IERC721(l2Token).safeTransferFrom(address(this), to, tokenId);
    }

    function initiateWithdrawal(uint256 tokenId, address l2Token, address to) external override {
        IERC721(l2Token).safeTransferFrom(msg.sender, address(this), tokenId);
        bytes memory data = abi.encodeWithSignature("finalizeWithdrawal(uint256,address,address)", tokenId, l2Token, to);
        L2ContractHelper.sendMessageToL1(data);
    }
}
