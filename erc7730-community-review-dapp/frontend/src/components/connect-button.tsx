'use client'

import { useAccount, useConnect, useDisconnect, useNetwork } from 'wagmi'
import { Button } from './ui/button'
import { Wallet, LogOut } from 'lucide-react'
import { CHAIN_ID, RPC_URL, NETWORK_NAME, BLOCK_EXPLORER } from '@/lib/constants'

export function ConnectButton() {
  const { address, isConnected } = useAccount()
  const { connect, connectors, isLoading, pendingConnector } = useConnect()
  const { disconnect } = useDisconnect()
  const { chain } = useNetwork()

  // Debug logging
  console.log('ConnectButton render:', {
    isConnected,
    address,
    chain: chain ? { id: chain.id, name: chain.name } : null,
    connectors: connectors.map(c => ({ id: c.id, name: c.name, ready: c.ready })),
    isLoading,
    pendingConnector
  })

  // Function to add Flow EVM Testnet to MetaMask
  const addFlowTestnetNetwork = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: `0x${CHAIN_ID.toString(16)}`, // Convert to hex
            chainName: NETWORK_NAME,
            nativeCurrency: {
              name: 'FLOW',
              symbol: 'FLOW',
              decimals: 18,
            },
            rpcUrls: [RPC_URL],
            blockExplorerUrls: [BLOCK_EXPLORER],
          }],
        })
      } catch (error) {
        console.error('Failed to add Flow EVM Testnet network:', error)
      }
    }
  }

  if (isConnected) {
    return (
      <div className="flex items-center space-x-4">
        <div className="flex flex-col items-start">
          <span className="text-sm text-muted-foreground">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </span>
          <span className="text-xs text-muted-foreground">
            {chain?.name || 'Unknown'} (ID: {chain?.id || 'Unknown'})
          </span>
        </div>
        {chain?.id !== CHAIN_ID && (
          <Button
            variant="outline"
            size="sm"
            onClick={addFlowTestnetNetwork}
            className="flex items-center space-x-2"
          >
            <span>Switch to {NETWORK_NAME}</span>
          </Button>
        )}
        <Button
          variant="outline"
          size="sm"
          onClick={() => disconnect()}
          className="flex items-center space-x-2"
        >
          <LogOut className="h-4 w-4" />
          <span>Disconnect</span>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex space-x-2">
      {connectors.length === 0 ? (
        <div className="text-sm text-red-500">No wallet connectors available</div>
      ) : (
        connectors.map((connector) => (
          <Button
            key={connector.id}
            onClick={() => {
              console.log('Attempting to connect with connector:', connector)
              connect({ connector })
            }}
            disabled={!connector.ready || isLoading}
            className="flex items-center space-x-2"
          >
            <Wallet className="h-4 w-4" />
            <span>
              {isLoading && pendingConnector?.id === connector.id
                ? 'Connecting...'
                : `Connect ${connector.name || 'Wallet'}`}
            </span>
          </Button>
        ))
      )}
    </div>
  )
}
