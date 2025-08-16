'use client'

import { WagmiConfig, createConfig, configureChains } from 'wagmi'
import { mainnet, sepolia, localhost } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Chain } from 'wagmi'

// Custom Anvil chain configuration
const anvilChain: Chain = {
  id: 31337,
  name: 'Anvil',
  network: 'anvil',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: { http: ['http://127.0.0.1:8545'] },
    public: { http: ['http://127.0.0.1:8545'] },
  },
  blockExplorers: {
    default: { name: 'Anvil', url: 'http://127.0.0.1:8545' },
  },
}

// Configure chains with Anvil as the default
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [anvilChain, sepolia, mainnet], // Anvil first for priority
  [publicProvider()]
)

// Debug logging
console.log('Wagmi config:', {
  chains: chains.map(c => ({ id: c.id, name: c.name })),
  defaultChain: chains[0]
})

const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ 
      chains,
      options: {
        shimDisconnect: true,
        UNSTABLE_shimOnConnectSelectAccount: true,
      }
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      }
    })
  ],
  publicClient,
  webSocketPublicClient,
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={config}>
      {children}
    </WagmiConfig>
  )
}
