// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

contract NFTContract is ERC721URIStorage, Ownable
{
    string public baseURI;
    
    constructor(string memory _name, string memory _symbol, string memory _uri) ERC721(_name, _symbol) {
        baseURI = _uri;
    }

    using Counters for Counters.Counter;
    Counters.Counter private tokenIdCounter;

    /********************************************************/
    /*                      modifier                        */
    /********************************************************/
    modifier isApprovedOrOwner(address _from, uint256 _tokenId) {
        require(_isApprovedOrOwner(_from, _tokenId),"From is not owner nor approved");
        _;
    }

    /********************************************************/
    /*                      public                          */
    /********************************************************/
    function mint(address _to) public onlyOwner returns (uint256) {
        tokenIdCounter.increment();
        uint256 tokenId = tokenIdCounter.current();
        _safeMint(_to, tokenId);
        _setTokenURI(tokenId, getTokenMetadataURI());

        return tokenId;
    }

    function mintBatch(address _to, uint _count) public onlyOwner {
        for (uint i = 0; i < _count; i++) {
            mint(_to);
        }
    }

    function transfer(address _from, address _to, uint256 _tokenId) public isApprovedOrOwner(_from, _tokenId) {
        _safeTransfer(_from, _to, _tokenId, "");
    }

    function verifiedTransfer(address _from, address _to, uint256 _tokenId, bytes memory _msgHash, uint8 _v, bytes32 _r, bytes32 _s) public isApprovedOrOwner(_from, _tokenId) {
        require(verify(_from, _msgHash, _v, _r, _s), "Failed to verify");
        _safeTransfer(_from, _to, _tokenId, "");
    }

    function getTokenURI(uint256 _tokenId) public view returns (string memory) {
        return tokenURI(_tokenId);
    }

    function getCurrentTokenId() public view returns (uint256) {
        return tokenIdCounter.current();
    }

    /********************************************************/
    /*                      internal                        */
    /********************************************************/
    function getTokenMetadataURI() internal view returns (string memory) {
        return string.concat(baseURI, Strings.toString(tokenIdCounter.current()), ".json");
    }

    function recoverAddress(bytes memory _msgHash, uint8 _v, bytes32 _r, bytes32 _s) internal pure returns (address) {
        bytes32 prefixedHash = keccak256(
            abi.encodePacked("\x19Ethereum Signed Message:\n32", _msgHash)
        );
        return ecrecover(prefixedHash, _v, _r, _s);
    }

    function verify(address _addr, bytes memory _msgHash, uint8 _v, bytes32 _r, bytes32 _s
    ) internal pure returns (bool) {
        return _addr == recoverAddress(_msgHash, _v, _r, _s);
    }
}
