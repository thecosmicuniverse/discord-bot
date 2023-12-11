type Link = {
  name: string,
  value: string,
  description: string,
  link: string
}

export const links: Link[] = [
  {
    name: "Website",
    value: "website",
    description: "The main Cosmic Universe Website.",
    link: "https://cosmicuniverse.io"
  },
  {
    name: "Gallery",
    value: "gallery",
    description: "The Cosmic Universe Gallery!",
    link: "https://gallery.cosmicuniverse.io"
  },
  {
    name: "Whitepaper",
    value: "whitepaper",
    description: "The nitty gritty.",
    link: "https://r2.cosmicuniverse.io/whitepaper.pdf"
  },
  {
    name: "Dex",
    value: "dex",
    description: "Get MAGICK at Trader Joe",
    link: "https://traderjoexyz.com/avalanche/trade?outputCurrency=0x9a8e0217cd870783c3f2317985c57bf570969153"
  },
  {
    name: "MAGICK/USDC LP",
    value: "magick-usdc-liquidity",
    description: "Trader Joe MAGICK/USDC Liquidity Pool",
    link: "https://traderjoexyz.com/avalanche/pool/v1/0x9a8e0217cd870783c3f2317985c57bf570969153/0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e"
  },
  {
    name: "MAGICK/AVAX LP",
    value: "magick-avax-liquidity",
    description: "Trader Joe MAGICK/AVAX Liquidity Pool",
    link: "https://traderjoexyz.com/avalanche/pool/v1/0x9a8e0217cd870783c3f2317985c57bf570969153/AVAX"
  }
]
