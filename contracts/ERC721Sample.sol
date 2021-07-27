// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC721Sample is ERC721Enumerable, Ownable {
    string private _baseUri;

    constructor() ERC721("NFT Sample", "NFTs") {
        console.log("Deploying an NTF samlpe");
    }

    function mint(address _to, uint256 _id) public onlyOwner {
        _mint(_to, _id);
    }

    function tokenURI(uint256 _tokenId) override public view returns (string memory) {
        return string(abi.encodePacked(_baseUri, Strings.toString(_tokenId)));
    }

    function setBaseURI(string memory _uri) public onlyOwner {
        console.log("Changing base URI from '%s' to '%s'", _baseUri, _uri);
        _baseUri = _uri;
    }
}
