// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@matterlabs/zksync-contracts/l1/contracts/zksync/interfaces/IMailbox.sol";
import "./IL1ERC721Bridge.sol";
import "./IL2ERC721Bridge.sol";

contract L1ERC721Bridge is IL1ERC721Bridge, Initializable, ReentrancyGuardUpgradeable {
    IERC721 public token;
    IMailbox public zkSyncMailbox;
    address public l2BridgeAddress;

    event DepositInitiated(uint256 tokenId, address indexed from, address indexed toL2, bytes32 l2TxHash);
    event WithdrawalCompleted(uint256 tokenId, address indexed to);

    function initialize(
        address _token,
        address _zkSyncMailbox,
        address _l2BridgeAddress
    ) public initializer {
        require(_token != address(0) && _zkSyncMailbox != address(0) && _l2BridgeAddress != address(0), "Invalid addresses");
        __ReentrancyGuard_init();
        token = IERC721(_token);
        zkSyncMailbox = IMailbox(_zkSyncMailbox);
        l2BridgeAddress = _l2BridgeAddress;
    }

    function deposit(uint256 tokenId, address toL2) public nonReentrant {
        token.safeTransferFrom(msg.sender, address(this), tokenId);
        bytes memory data = abi.encodeWithSelector(
            IL2ERC721Bridge.finalizeDeposit.selector,
            tokenId,
            msg.sender,
            toL2
        );
        bytes32 l2TxHash = zkSyncMailbox.requestL2Transaction(
            l2BridgeAddress,
            0,
            data,
            500000,
            0,
            new bytes[](0) ,
            msg.sender
        );
        emit DepositInitiated(tokenId, msg.sender, toL2, l2TxHash);
    }

    function finalizeWithdrawal(uint256 tokenId, address to) external nonReentrant {
        require(msg.sender == address(zkSyncMailbox), "Callable only via zkSync");
        token.safeTransferFrom(address(this), to, tokenId);
        emit WithdrawalCompleted(tokenId, to);
    }
}
