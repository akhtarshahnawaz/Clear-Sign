'use client'

import { WagmiConfig, createConfig, configureChains } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Chain } from 'wagmi'
import { RPC_URL, CHAIN_ID, NETWORK_NAME, BLOCK_EXPLORER } from '@/lib/constants'

// Custom Flow EVM Testnet chain configuration
const flowTestnetChain: Chain = {
  id: CHAIN_ID,
  name: NETWORK_NAME,
  network: 'flow-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'FLOW',
    symbol: 'FLOW',
  },
  rpcUrls: {
    default: { http: [RPC_URL] },
    public: { http: [RPC_URL] },
  },
  blockExplorers: {
    default: { name: NETWORK_NAME, url: BLOCK_EXPLORER },
  },
}

// Configure chains with Flow EVM Testnet as the default
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [flowTestnetChain], // Only Flow EVM Testnet
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
