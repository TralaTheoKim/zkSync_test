// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC721Bridge {
    event DepositInitiated(
        bytes32 indexed l2DepositTxHash,
        address indexed from,
        address indexed to,
        address l1Token,
        uint256 tokenId
    );

    event WithdrawalFinalized(
        address indexed to,
        address indexed l1Token,
        uint256 tokenId
    );

    function deposit(
        address _l2Receiver,
        address _l1Token,
        uint256 _tokenId,
        uint256 _l2TxGasLimit,
        uint256 _l2TxGasPerPubdataByte,
        address _refundRecipient
    ) external payable returns (bytes32 txHash);

    function withdraw(
        uint256 _tokenId,
        address _l1Receiver,
        address _l2Token
    ) external;
}