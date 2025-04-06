// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Marketplace is ReentrancyGuard {
    struct Listing {
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
    }

    uint256 public listingId;
    mapping(uint256 => Listing) public listings;

    event Listed(uint256 listingId, address seller, address nftContract, uint256 tokenId, uint256 price);
    event Purchased(uint256 listingId, address buyer);

    function listToken(address nftContract, uint256 tokenId, uint256 price) external {
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
        listings[listingId] = Listing(msg.sender, nftContract, tokenId, price);
        emit Listed(listingId, msg.sender, nftContract, tokenId, price);
        listingId++;
    }

function buyToken(uint256 _listingId) external payable nonReentrant {
    Listing memory item = listings[_listingId];

    require(item.price > 0, "Listing does not exist");
    require(msg.value >= item.price, "Not enough ETH");
    require(IERC721(item.nftContract).ownerOf(item.tokenId) == address(this), "Marketplace doesn't own NFT");

    delete listings[_listingId];

    IERC721(item.nftContract).transferFrom(address(this), msg.sender, item.tokenId);
    payable(item.seller).transfer(item.price);

    emit Purchased(_listingId, msg.sender);
}

}
