// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface IL1ERC721Bridge {
    /// @notice Initiates the deposit of an ERC721 token to L2.
    /// @param tokenId The ID of the token being deposited.
    /// @param to The address on L2 to receive the token.
    function deposit(uint256 tokenId, address to) external;

    /// @notice Completes the withdrawal of an ERC721 token from L2 back to L1.
    /// @param tokenId The ID of the token being withdrawn.
    /// @param to The address on L1 to receive the token.
    function finalizeWithdrawal(uint256 tokenId, address to) external;
}
