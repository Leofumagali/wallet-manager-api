interface Wallet {
  waleltId: string
  walletName: string
  walletAddress: string
  network: Chain
  cryptocurrencies: Cryptocurrency[]
}

interface Chain {
  chainId: number
  chainName: string
  rpcUrl: string
  currencySymbol: string
  blockExplorer: string
}

interface Cryptocurrency {
  contractAddress: string
  tokenSymbol: string
  decimals: number
}

export { Wallet, Chain, Cryptocurrency };