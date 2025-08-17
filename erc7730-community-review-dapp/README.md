# ERC7730 Community Review DApp

A decentralized application for community review of smart contract metadata, built with Solidity, Foundry, Next.js, and Wagmi.

## 📋 Table of Contents

- [Contracts Deployment and Configuration](#contracts-deployment-and-configuration)
- [Frontend Configuration](#frontend-configuration)
- [Project Structure](#project-structure)
- [Features](#features)

## 🚀 Contracts Deployment and Configuration

### Prerequisites

- [Foundry](https://getfoundry.sh/) installed
- Node.js and npm installed
- Access to the target network (RPC URL, private key)

### Quick Start

1. **Navigate to contracts directory:**
   ```bash
   cd contracts
   ```

2. **Build the contracts:**
   ```bash
   forge build
   ```

3. **Deploy using one of the provided scripts:**
   ```bash
   # For local development (Anvil)
   ./anvil.sh
   
   # For Flow EVM Testnet
   ./flow.sh
   ```

### Deployment Scripts

#### `anvil.sh` - Local Development
```bash
#!/bin/bash
# Anvil Local Deployment Script
# All values configured here

# Configuration
PRIVATE_KEY="0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
RPC_URL="http://127.0.0.1:8545"
CHAIN_ID="31337"
NETWORK_NAME="Anvil Local"
```

#### `flow.sh` - Flow EVM Testnet
```bash
#!/bin/bash
# Flow EVM Testnet Deployment Script
# All values configured here

# Configuration
PRIVATE_KEY="0x7e3a30f14217349f4252e6681c7ccd7e3f93c699da64a6e1d1b2a7b6de219224"
RPC_URL="https://testnet.evm.nodes.onflow.org"
CHAIN_ID="545"
NETWORK_NAME="Flow EVM Testnet"
```

### Adding New Networks

To deploy to a new network, follow these steps:

1. **Copy an existing script:**
   ```bash
   cp flow.sh mynetwork.sh
   ```

2. **Edit the configuration section:**
   ```bash
   # Configuration
   PRIVATE_KEY="your_private_key_here"
   RPC_URL="your_rpc_url_here"
   CHAIN_ID="your_chain_id_here"
   NETWORK_NAME="Your Network Name"
   ```

3. **Make the script executable:**
   ```bash
   chmod +x mynetwork.sh
   ```

4. **Deploy:**
   ```bash
   ./mynetwork.sh
   ```

### What the Scripts Do

1. **Deploy Contract:** Uses `forge script` to deploy the contract
2. **Extract Address:** Reads the deployed address from Foundry's broadcast files
3. **Update Frontend:** Automatically updates `../frontend/.env.local` with:
   - Contract address
   - RPC URL
   - Chain ID
   - Network settings

### Manual Deployment

If you prefer manual deployment:

```bash
# Deploy contract
forge script script/Deploy.s.sol --rpc-url YOUR_RPC_URL --broadcast

# Get deployed address from broadcast file
cat broadcast/Deploy.s.sol/YOUR_CHAIN_ID/run-latest.json | grep "contractAddress"
```

### Testing

```bash
# Run all tests
forge test

# Run tests with verbose output
forge test -vvv

# Run specific test
forge test --match-test testFunctionName
```

## 🎨 Frontend Configuration

### Prerequisites

- Node.js 18+ and npm
- Access to the deployed contract
- Network RPC URL

### Environment Setup

1. **Copy the environment template:**
   ```bash
   cd frontend
   cp .env.flow .env.local
   ```

2. **Edit `.env.local` with your configuration:**
   ```bash
   # Contract Configuration
   NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourDeployedContractAddress
   
   # Network Configuration
   NEXT_PUBLIC_RPC_URL=https://your-rpc-url.com
   NEXT_PUBLIC_CHAIN_ID=123
   NEXT_PUBLIC_NETWORK_NAME=Your Network Name
   NEXT_PUBLIC_BLOCK_EXPLORER=https://your-explorer.com
   
   # Gas Configuration
   NEXT_PUBLIC_DEFAULT_GAS_LIMIT=500000
   NEXT_PUBLIC_DEFAULT_GAS_PRICE=20000000000
   
   # UI Configuration
   NEXT_PUBLIC_MAX_COMMENT_LENGTH=500
   NEXT_PUBLIC_MIN_BLOB_ID_LENGTH=10
   NEXT_PUBLIC_MIN_HYPERGRAPH_ID_LENGTH=10
   
   # Walrus Network Configuration
   NEXT_PUBLIC_WALRUS_PUBLISHER_BASE_URL=https://your-walrus-publisher.com
   NEXT_PUBLIC_WALRUS_AGGREGATOR_BASE_URL=https://your-walrus-aggregator.com
   ```

### Contract ABI Setup

The ABI is automatically generated from the deployed contract:

1. **Generate ABI:**
   ```bash
   npm run generate-abi
   ```

2. **What this does:**
   - Reads the contract from Foundry build artifacts
   - Generates `src/lib/contract-abi.ts`
   - Updates automatically when contracts change

3. **Manual ABI generation:**
   ```bash
   cd ../contracts
   forge inspect ERC7730CommunityReview abi --json > ../frontend/src/lib/contract-abi.json
   cd ../frontend
   node scripts/generate-abi.js
   ```

### Running the Application

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run generate-abi # Generate contract ABI
```

### Configuration Files

- **`.env.local`** - Environment variables (not committed to git)
- **`src/lib/constants.ts`** - Application constants (imports from env)
- **`src/lib/contract-abi.ts`** - Auto-generated contract ABI
- **`src/components/providers.tsx`** - Wagmi configuration
- **`src/components/connect-button.tsx`** - Wallet connection logic

### Network Configuration

The frontend automatically configures itself based on your `.env.local`:

- **Chain ID:** Determines which network to connect to
- **RPC URL:** Where to send blockchain requests
- **Block Explorer:** For transaction links
- **Contract Address:** Which contract to interact with

### Wallet Connection

The app supports:
- MetaMask
- Any injected wallet
- Automatic network switching
- Network addition prompts

## 🏗️ Project Structure

```
erc7730-community-review-dapp/
├── contracts/                 # Solidity smart contracts
│   ├── src/                  # Contract source code
│   ├── script/               # Deployment scripts
│   ├── test/                 # Contract tests
│   ├── anvil.sh             # Local deployment script
│   ├── flow.sh              # Flow deployment script
│   └── foundry.toml         # Foundry configuration
├── frontend/                 # Next.js frontend
│   ├── src/                  # Source code
│   │   ├── app/             # Next.js app router
│   │   ├── components/      # React components
│   │   ├── hooks/           # Custom hooks
│   │   ├── lib/             # Utilities and constants
│   │   └── types/           # TypeScript types
│   ├── scripts/              # Build scripts
│   ├── .env.local           # Environment variables
│   └── package.json         # Dependencies and scripts
└── README.md                 # This file
```

## ✨ Features

- **Smart Contract Integration:** Full Solidity contract interaction
- **Multi-Network Support:** Easy deployment to any EVM network
- **Automatic Configuration:** Scripts handle deployment and setup
- **Modern Frontend:** Next.js 13+ with App Router
- **Type Safety:** Full TypeScript support
- **Wallet Integration:** MetaMask and injected wallet support
- **Responsive Design:** Mobile-first UI components
- **Real-time Updates:** Live blockchain data
- **Error Handling:** Comprehensive error management
- **Testing:** Full test coverage for contracts

## 🔧 Troubleshooting

### Common Issues

1. **Contract not found:**
   - Verify contract address in `.env.local`
   - Check if contract is deployed on the correct network
   - Ensure RPC URL is correct

2. **ABI errors:**
   - Run `npm run generate-abi` to regenerate
   - Check if contract was rebuilt after changes

3. **Network connection issues:**
   - Verify RPC URL is accessible
   - Check chain ID matches network
   - Ensure wallet is connected to correct network

4. **Build errors:**
   - Clear `.next` folder: `rm -rf .next`
   - Reinstall dependencies: `rm -rf node_modules && npm install`
   - Check TypeScript errors: `npx tsc --noEmit`

### Getting Help

- Check the console for error messages
- Verify all environment variables are set
- Ensure contract is deployed and accessible
- Test with a simple contract call first

## 📝 License

This project is licensed under the MIT License.
