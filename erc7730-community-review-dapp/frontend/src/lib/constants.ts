// Contract address - update this after deployment
export const CONTRACT_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3" as const

// Network configuration
export const SUPPORTED_CHAINS = {
  mainnet: 1,
  sepolia: 11155111,
  localhost: 31337,
} as const

// Default chain to connect to
export const DEFAULT_CHAIN_ID = 31337 // localhost/Anvil

// Default values
export const DEFAULT_GAS_LIMIT = 500000
export const DEFAULT_GAS_PRICE = "20000000000" // 20 gwei

// UI constants
export const MAX_COMMENT_LENGTH = 500
export const MIN_CONTRACT_ID_LENGTH = 10
export const MIN_BLOB_ID_LENGTH = 10
export const MIN_HYPERGRAPH_ID_LENGTH = 10
