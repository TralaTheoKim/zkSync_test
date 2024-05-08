// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface IL2ERC721Bridge {
    function finalizeDeposit(uint256 tokenId, address l1Token, address to) external;
    function initiateWithdrawal(uint256 tokenId, address l2Token, address to) external;
}
