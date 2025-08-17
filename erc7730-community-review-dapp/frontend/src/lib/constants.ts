// Environment-based configuration with fallbacks
export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"

// Network configuration
export const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || "http://127.0.0.1:8545"
export const CHAIN_ID = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || "31337")

export const SUPPORTED_CHAINS = {
  mainnet: 1,
  sepolia: 11155111,
  localhost: 31337,
} as const

// Default chain to connect to
export const DEFAULT_CHAIN_ID = parseInt(process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID || "31337") // localhost/Anvil

// Gas configuration
export const DEFAULT_GAS_LIMIT = parseInt(process.env.NEXT_PUBLIC_DEFAULT_GAS_LIMIT || "500000")
export const DEFAULT_GAS_PRICE = process.env.NEXT_PUBLIC_DEFAULT_GAS_PRICE || "20000000000" // 20 gwei

// UI constants
export const MAX_COMMENT_LENGTH = parseInt(process.env.NEXT_PUBLIC_MAX_COMMENT_LENGTH || "500")
// Contract address validation - Ethereum addresses are always 42 characters (0x + 40 hex chars)
export const CONTRACT_ADDRESS_LENGTH = 42
export const MIN_BLOB_ID_LENGTH = parseInt(process.env.NEXT_PUBLIC_MIN_BLOB_ID_LENGTH || "10")
export const MIN_HYPERGRAPH_ID_LENGTH = parseInt(process.env.NEXT_PUBLIC_MIN_HYPERGRAPH_ID_LENGTH || "10")

// Environment detection
export const IS_PRODUCTION = process.env.NODE_ENV === 'production'
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'
export const IS_TEST = process.env.NODE_ENV === 'test'

// Walrus Network Configuration
export const WALRUS_PUBLISHER_BASE_URL = process.env.NEXT_PUBLIC_WALRUS_PUBLISHER_BASE_URL || "http://walrus-testnet-publisher.starduststaking.com"
export const WALRUS_AGGREGATOR_BASE_URL = process.env.NEXT_PUBLIC_WALRUS_AGGREGATOR_BASE_URL || "http://agg.test.walrus.eosusa.io"
