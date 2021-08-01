// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC721Sample is ERC721Enumerable, Ownable {
    mapping(uint256 => string) private _tokenUris;

    constructor() ERC721("NFT Sample", "NFTs") {
        console.log("Deploying an NTF samlpe");
    }

    function mint(address _to, uint256 _id, string memory _uri) public onlyOwner {
        console.log("Minting token '%d' with uri '%s'", _id, _uri);
        _mint(_to, _id);
        _tokenUris[_id] = _uri;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return string(abi.encodePacked("ipfs://", _tokenUris[tokenId]));
    }
}
