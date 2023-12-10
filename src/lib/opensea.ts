import { ethers } from "ethers";
import { OpenSeaSDK, Chain } from "opensea-js";

// This example provider won't let you make transactions, only read-only calls:
const provider = new ethers.JsonRpcProvider("https://api.avax.network/ext/bc/C/rpc");

let openSeaSDK: OpenSeaSDK;

if (!global._openSeaSDK) {
  global._openSeaSDK = new OpenSeaSDK(provider, {
    chain: Chain.Avalanche,
    apiKey: process.env.OPENSEA_API_KEY,
  });
}
openSeaSDK = global._openSeaSDK;


export default openSeaSDK;