'use client'

import { WagmiConfig, createConfig, configureChains } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Chain } from 'wagmi'
import { RPC_URL, CHAIN_ID, NETWORK_NAME, BLOCK_EXPLORER } from '@/lib/constants'

// Debug environment variables
console.log('🔧 Providers: Environment variables:', {
  CHAIN_ID,
  NETWORK_NAME,
  RPC_URL: RPC_URL?.substring(0, 30) + '...',
  BLOCK_EXPLORER: BLOCK_EXPLORER?.substring(0, 30) + '...'
})

// Custom Flow EVM Testnet chain configuration
const flowTestnetChain: Chain = {
  id: CHAIN_ID || 545, // Fallback to Flow EVM Testnet
  name: NETWORK_NAME || 'Flow EVM Testnet',
  network: 'flow-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'FLOW',
    symbol: 'FLOW',
  },
  rpcUrls: {
    default: { http: [RPC_URL || 'https://testnet.evm.nodes.onflow.org'] },
    public: { http: [RPC_URL || 'https://testnet.evm.nodes.onflow.org'] },
  },
  blockExplorers: {
    default: { name: NETWORK_NAME || 'Flow EVM Testnet', url: BLOCK_EXPLORER || 'https://evm-testnet.flowscan.io' },
  },
}

// Configure chains with Flow EVM Testnet as the default
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [flowTestnetChain], // Only Flow EVM Testnet
  [publicProvider()]
)

// Ensure chains are properly configured and available
const availableChains = chains || [flowTestnetChain]
console.log('🔧 Providers: Configured chains:', availableChains.map(c => ({ id: c.id, name: c.name, network: c.network })))

// Debug logging
console.log('Wagmi config:', {
  chains: chains.map(c => ({ id: c.id, name: c.name })),
  defaultChain: chains[0]
})

const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ 
      chains: availableChains,
      options: {
        shimDisconnect: true,
        UNSTABLE_shimOnConnectSelectAccount: true,
      }
    }),
    new InjectedConnector({
      chains: availableChains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      }
    })
  ],
  publicClient,
  webSocketPublicClient,
})

// Debug the final config
console.log('🔧 Providers: Final config chains:', config.chains?.map(c => ({ id: c.id, name: c.name })) || 'UNDEFINED')
console.log('🔧 Providers: Final config connectors:', config.connectors?.map(c => ({ id: c.id, name: c.name })) || 'UNDEFINED')

// Debug config
console.log('🔧 Providers: Wagmi config created:', {
  chains: config.chains?.map(c => ({ id: c.id, name: c.name })),
  connectors: config.connectors?.map(c => ({ id: c.id, name: c.name })),
  publicClient: !!config.publicClient
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={config}>
      {children}
    </WagmiConfig>
  )
}
