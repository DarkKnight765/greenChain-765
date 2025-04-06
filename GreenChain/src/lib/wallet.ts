import { ethers } from "ethers";

export async function connectWallet() {
  if (!window.ethereum) {
    alert("MetaMask not found. Please install it.");
    return;
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();

    console.log("Connected wallet:", address);
    return { provider, signer, address };
  } catch (error) {
    console.error("Wallet connection failed:", error);
    throw error;
  }
}
