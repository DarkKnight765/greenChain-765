export const MarketplaceABI = [
    {
      "anonymous": false,
      "inputs": [
        { "indexed": false, "internalType": "uint256", "name": "listingId", "type": "uint256" },
        { "indexed": false, "internalType": "address", "name": "seller", "type": "address" },
        { "indexed": false, "internalType": "address", "name": "nftContract", "type": "address" },
        { "indexed": false, "internalType": "uint256", "name": "tokenId", "type": "uint256" },
        { "indexed": false, "internalType": "uint256", "name": "price", "type": "uint256" }
      ],
      "name": "Listed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        { "indexed": false, "internalType": "uint256", "name": "listingId", "type": "uint256" },
        { "indexed": false, "internalType": "address", "name": "buyer", "type": "address" }
      ],
      "name": "Purchased",
      "type": "event"
    },
    {
      "inputs": [{ "internalType": "uint256", "name": "_listingId", "type": "uint256" }],
      "name": "buyToken",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "nftContract", "type": "address" },
        { "internalType": "uint256", "name": "tokenId", "type": "uint256" },
        { "internalType": "uint256", "name": "price", "type": "uint256" }
      ],
      "name": "listToken",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "listingId",
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
      "name": "listings",
      "outputs": [
        { "internalType": "address", "name": "seller", "type": "address" },
        { "internalType": "address", "name": "nftContract", "type": "address" },
        { "internalType": "uint256", "name": "tokenId", "type": "uint256" },
        { "internalType": "uint256", "name": "price", "type": "uint256" }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
  