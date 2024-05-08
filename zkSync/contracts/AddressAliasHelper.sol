// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library AddressAliasHelper {
    function applyL1ToL2Alias(address l1Address) internal pure returns (address l2Address) {
        return address(uint160(l1Address) + uint160(0x1111000000000000000000000000000000001111));
    }

    function undoL1ToL2Alias(address l2Address) internal pure returns (address l1Address) {
        return address(uint160(l2Address) - uint160(0x1111000000000000000000000000000000001111));
    }
}
