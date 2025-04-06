// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CarbonCredit is ERC721URIStorage, Ownable {
    uint256 public nextTokenId;
    mapping(uint256 => CreditData) public creditData;

    struct CreditData {
        string projectName;
        string description;
        uint256 amount;
    }

    // Declare the events
    event CarbonMinted(uint256 tokenId);
    event CarbonCreditMinted(uint256 tokenId);

    // Modified constructor to initialize next token id and pass the deployer as the initial owner
constructor() ERC721("CarbonCredit", "CC") {
    nextTokenId = 0;
    emit CarbonMinted(0); // ✅ Semicolon added
}

    // Modified function to emit an event and validate input parameters (if desired)
    function mintCarbonCredit(
        string memory projectName,
        string memory description,
        uint256 amount
    ) public returns (uint256) {
        require(bytes(projectName).length != 0, "project name cannot be empty");
        require(amount > 0, "amount should not be zero or negative.");
        uint256 tokenId = nextTokenId;
        _safeMint(msg.sender, tokenId);
        creditData[tokenId] = CreditData(projectName, description, amount); 
        nextTokenId++;
        emit CarbonCreditMinted(tokenId); // Emit an event for this new carbon credit being minted.
        return tokenId;
    }
}
