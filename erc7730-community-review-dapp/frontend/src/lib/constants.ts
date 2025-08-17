// Environment-based configuration for Flow EVM Testnet
export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS! as `0x${string}`

// Network configuration - Flow EVM Testnet
export const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL!
export const CHAIN_ID = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID!)
export const NETWORK_NAME = process.env.NEXT_PUBLIC_NETWORK_NAME!
export const BLOCK_EXPLORER = process.env.NEXT_PUBLIC_BLOCK_EXPLORER!

// Gas configuration
export const DEFAULT_GAS_LIMIT = parseInt(process.env.NEXT_PUBLIC_DEFAULT_GAS_LIMIT!)
export const DEFAULT_GAS_PRICE = process.env.NEXT_PUBLIC_DEFAULT_GAS_PRICE!

// UI constants
export const MAX_COMMENT_LENGTH = parseInt(process.env.NEXT_PUBLIC_MAX_COMMENT_LENGTH!)
export const CONTRACT_ADDRESS_LENGTH = 42
export const MIN_BLOB_ID_LENGTH = parseInt(process.env.NEXT_PUBLIC_MIN_BLOB_ID_LENGTH!)
export const MIN_HYPERGRAPH_ID_LENGTH = parseInt(process.env.NEXT_PUBLIC_MIN_HYPERGRAPH_ID_LENGTH!)

// Environment detection
export const IS_PRODUCTION = process.env.NODE_ENV === 'production'
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'
export const IS_TEST = process.env.NODE_ENV === 'test'

// Walrus Network Configuration
export const WALRUS_PUBLISHER_BASE_URL = process.env.NEXT_PUBLIC_WALRUS_PUBLISHER_BASE_URL!
export const WALRUS_AGGREGATOR_BASE_URL = process.env.NEXT_PUBLIC_WALRUS_AGGREGATOR_BASE_URL!

// Validate required environment variables (only in development)
if (process.env.NODE_ENV === 'development') {
  if (!CONTRACT_ADDRESS) console.warn('NEXT_PUBLIC_CONTRACT_ADDRESS is missing')
  if (!RPC_URL) console.warn('NEXT_PUBLIC_RPC_URL is missing')
  if (!CHAIN_ID) console.warn('NEXT_PUBLIC_CHAIN_ID is missing')
  if (!NETWORK_NAME) console.warn('NEXT_PUBLIC_NETWORK_NAME is missing')
  if (!BLOCK_EXPLORER) console.warn('NEXT_PUBLIC_BLOCK_EXPLORER is missing')
}
