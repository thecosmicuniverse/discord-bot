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
    description: "Trader Joe MAGIC/AVAX.",
    link: "https://traderjoexyz.com/avalanche/trade?outputCurrency=0x9a8e0217cd870783c3f2317985c57bf570969153"
  }
]