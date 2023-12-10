import { createPublicClient, fallback, http } from "viem";
import { avalanche } from "viem/chains";

const publicClientSettings = {
  cacheTime: 10_000, // 7s
  pollingInterval: 5_000, // 4s
  batch: {
    multicall: {
      batchSize: 1_024, // 1KB orig
      wait: 500, // 0.5s
    },
  },
}
const makeTransport = (url: string) => http(url, { retryCount: 1, retryDelay: 500, timeout: 3_000 });

const makeFallbackTransport = (urls: string[]) => fallback( urls.map(url => makeTransport(url)), {
  retryCount: 1,
  retryDelay: 500,
  rank: {
    interval: 60_000,
    sampleCount: 10,
  }
});

export const publicClient = createPublicClient({
  chain: avalanche,
  transport: makeFallbackTransport([
    "https://api.avax.network/ext/bc/C/rpc",
    "https://avalanche.public-rpc.com",
    "https://rpc.ankr.com/avalanche"
  ]),
  name: "Avalanche Public Client",
  ...publicClientSettings,
});
