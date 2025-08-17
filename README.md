# Clear-Sign: ERC7730 Community Review DApp

A comprehensive decentralized application for community review of ERC7730 metadata submissions, built with modern web3 technologies and best practices.

## 🏗️ Project Structure

```
Clear-Sign/
├── erc7730-community-review-dapp/     # Main DApp project
│   ├── contracts/                      # Smart contracts (Foundry)
│   │   ├── src/                        # Solidity source files
│   │   ├── test/                       # Contract tests
│   │   ├── script/                     # Deployment scripts
│   │   ├── scripts/                    # Build and ABI generation scripts
│   │   └── foundry.toml               # Foundry configuration
│   └── frontend/                       # Next.js frontend application
│       ├── src/                        # React source code
│       ├── public/                     # Static assets
│       └── package.json               # Frontend dependencies
├── clear-signing-erc7730-builder/      # Important builder project
├── python-erc7730/                     # Python utilities
└── README.md                           # This master documentation
```

## 🚀 Quick Start

### Prerequisites
- **Node.js**: Version 18.0.0 or higher
- **Foundry**: Latest stable version
- **Git**: Version 2.25.0 or higher
- **MetaMask**: Browser extension for wallet management

### 1. Clone and Setup
```bash
git clone <repository-url>
cd Clear-Sign
```

### 2. Backend Setup (Smart Contracts)
```bash
cd erc7730-community-review-dapp/contracts

# Install Foundry dependencies
forge install

# Build contracts
forge build

# Generate ABI for frontend (automatic)
npm run generate-abi

# Run tests
forge test
```

### 3. Frontend Setup
```bash
cd erc7730-community-review-dapp/frontend

# Install dependencies
npm install

# Generate ABI (if not done automatically)
npm run generate-abi

# Start development server
npm run dev
```

### 4. Start Local Blockchain
```bash
# In a new terminal
cd erc7730-community-review-dapp/contracts
anvil

# Deploy contracts (in another terminal)
forge script script/Deploy.s.sol --rpc-url http://127.0.0.1:8545 --broadcast
```

## 🔧 How Frontend Accesses Contract Data

### **Contract Address Configuration**
The frontend gets the contract address from environment variables:

```typescript
// frontend/src/lib/constants.ts
export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0x5fbdb2315678afecb367f032d93f642f64180aa3"
```

**Environment Setup:**
```bash
# frontend/.env.local
NEXT_PUBLIC_CONTRACT_ADDRESS=0x5fbdb2315678afecb367f032d93f642f64180aa3
NEXT_PUBLIC_RPC_URL=http://127.0.0.1:8545
NEXT_PUBLIC_CHAIN_ID=31337
```

### **Contract ABI Access**
The frontend automatically gets the latest contract ABI through an intelligent generation system:

#### **Automatic ABI Generation Workflow:**
1. **Foundry Build**: `forge build` generates build artifacts in `contracts/out/`
2. **ABI Extraction**: Script reads `out/ERC7730CommunityReview.sol/ERC7730CommunityReview.json`
3. **Frontend Update**: ABI and TypeScript types automatically copied to `frontend/src/lib/`

#### **Generated Files:**
- `frontend/src/lib/contract-abi.ts` - Complete contract ABI
- `frontend/src/lib/contract-types.ts` - TypeScript type definitions

#### **Usage in Frontend:**
```typescript
// frontend/src/hooks/use-contract.ts
import { ERC7730COMMUNITYREVIEW_ABI } from '@/lib/contract-abi'

const { data } = useContractRead({
  address: contractAddress,
  abi: ERC7730COMMUNITYREVIEW_ABI,
  functionName: 'getTotalSubmissions',
})
```

### **RPC URL and Network Configuration**
The frontend connects to the blockchain through configured RPC endpoints:

```typescript
// frontend/src/lib/constants.ts
export const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || "http://127.0.0.1:8545"
export const CHAIN_ID = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || "31337")
```

**Supported Networks:**
- **Local Development**: `http://127.0.0.1:8545` (Chain ID: 31337)
- **Sepolia Testnet**: `https://eth-sepolia.g.alchemy.com/v2/...` (Chain ID: 11155111)
- **Ethereum Mainnet**: `https://eth-mainnet.g.alchemy.com/v2/...` (Chain ID: 1)

### **Walrus Network Configuration**
The frontend integrates with the Walrus network for decentralized file storage and retrieval:

```typescript
// frontend/src/lib/constants.ts
export const WALRUS_PUBLISHER_BASE_URL = process.env.NEXT_PUBLIC_WALRUS_PUBLISHER_BASE_URL || "http://walrus-testnet-publisher.starduststaking.com"
export const WALRUS_AGGREGATOR_BASE_URL = process.env.NEXT_PUBLIC_WALRUS_AGGREGATOR_BASE_URL || "http://agg.test.walrus.eosusa.io"
```

**Environment Setup:**
```bash
# frontend/.env.local
NEXT_PUBLIC_WALRUS_PUBLISHER_BASE_URL=http://walrus-testnet-publisher.starduststaking.com
NEXT_PUBLIC_WALRUS_AGGREGATOR_BASE_URL=http://agg.test.walrus.eosusa.io
```

**Walrus Network Features:**
- **Publisher**: Used for publishing files to the Walrus network
- **Aggregator**: Used for retrieving files by blob ID
- **File Retrieval**: `curl "$AGGREGATOR/v1/blobs/<blob_id>"` returns JSON content
- **Integration**: Frontend displays view icons next to Walrus Blob IDs for easy content inspection

## 🔄 Backend Configuration and Workflow

### **Smart Contract Configuration**
Smart contracts are configured through Foundry's configuration system:

```toml
# contracts/foundry.toml
[profile.default]
src = "src"
out = "out"
libs = ["lib"]
solc_version = "0.8.19"
optimizer = true
optimizer_runs = 200
```

### **Contract Deployment Configuration**
Deployment settings are managed through environment variables and scripts:

```bash
# contracts/.env (create this file)
PRIVATE_KEY=your_private_key_here
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/your-api-key
MAINNET_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/your-api-key
```

### **ABI Generation Commands**
```bash
# From contracts directory
npm run generate-abi          # Generate ABI only
npm run build                 # Build and auto-generate ABI
./scripts/setup-workflow.sh   # Complete workflow script

# From frontend directory
npm run generate-abi          # Generate ABI from contracts
npm run dev                   # Auto-generate ABI before starting
npm run build                 # Auto-generate ABI before building
```

## 📱 Frontend Architecture

### **Component Structure**
```
frontend/src/
├── app/                      # Next.js App Router
│   ├── page.tsx             # Homepage (submission form)
│   ├── my-submissions/      # User's submissions page
│   ├── review-community/    # Community review page
│   └── search/              # Metadata search page
├── components/               # React components
│   ├── metadata-submission-form.tsx
│   ├── my-submissions-list.tsx
│   ├── community-submissions-list.tsx
│   └── metadata-search.tsx
├── hooks/                    # Custom React hooks
│   └── use-contract.ts      # Contract interaction hooks
└── lib/                      # Utilities and constants
    ├── contract-abi.ts      # Auto-generated ABI
    ├── contract-types.ts    # Auto-generated types
    └── constants.ts         # Configuration constants
```

### **State Management**
- **Wagmi**: Ethereum state management and hooks
- **React Context**: Application state and wallet connection
- **Local State**: Component-level state management

### **Contract Interactions**
All contract interactions go through the `useContract` hook:

```typescript
// Example: Submit metadata
const { submit, isLoading, isSuccess } = useSubmitMetadata(
  contractId, 
  walrusBlobId, 
  hypergraphId
)

// Example: Get submissions
const { data: totalSubmissions } = useGetTotalSubmissions()
```

## 🧪 Testing and Development

### **Smart Contract Testing**
```bash
cd erc7730-community-review-dapp/contracts

# Run all tests
forge test

# Run with verbose output
forge test -vv

# Run specific test
forge test --match-test testSubmitMetadata

# Gas reporting
forge test --gas-report
```

### **Frontend Testing**
```bash
cd erc7730-community-review-dapp/frontend

# Run test suite
npm run test

# Run in watch mode
npm run test:watch

# Type checking
npm run type-check
```

### **Integration Testing**
```bash
# 1. Start local blockchain
cd contracts && anvil

# 2. Deploy contracts
forge script script/Deploy.s.sol --rpc-url http://127.0.0.1:8545 --broadcast

# 3. Start frontend
cd frontend && npm run dev

# 4. Test complete workflow in browser
```

## 🚀 Deployment

### **Smart Contract Deployment**

#### **Local Development**
```bash
cd contracts
forge script script/Deploy.s.sol --rpc-url http://127.0.0.1:8545 --broadcast
```

#### **Testnet Deployment (Sepolia)**
```bash
cd contracts
export PRIVATE_KEY=your_private_key_here
export SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/your-api-key

forge script script/Deploy.s.sol --rpc-url $SEPOLIA_RPC_URL --broadcast --verify
```

#### **Mainnet Deployment**
```bash
cd contracts
export PRIVATE_KEY=your_private_key_here
export MAINNET_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/your-api-key

# Verify configuration first
forge script script/Deploy.s.sol --rpc-url $MAINNET_RPC_URL --dry-run

# Deploy to mainnet
forge script script/Deploy.s.sol --rpc-url $MAINNET_RPC_URL --broadcast --verify
```

### **Frontend Deployment**

#### **Build for Production**
```bash
cd frontend
npm run build
npm start
```

#### **Deploy to Vercel**
```bash
npm i -g vercel
vercel
# Set environment variables in Vercel dashboard
```

#### **Deploy to Netlify**
```bash
npm run build
# Deploy build folder to Netlify
# Set environment variables in Netlify dashboard
```

## 🔒 Security Features

- **Access Control**: Only submitters can deactivate their submissions
- **Review Prevention**: Users cannot review their own submissions
- **Duplicate Prevention**: One review per user per submission
- **Input Validation**: Comprehensive form validation
- **Secure Transactions**: MetaMask integration for transaction signing

## 🆘 Troubleshooting

### **Common Issues**

#### **ABI Not Generated**
```bash
cd contracts
forge build
npm run generate-abi
```

#### **Frontend Can't Connect**
```bash
# Check environment variables
cd frontend
cat .env.local

# Check network connection
curl http://127.0.0.1:8545
```

#### **Contract Deployment Issues**
```bash
cd contracts
forge build
forge script script/Deploy.s.sol --rpc-url http://127.0.0.1:8545 --dry-run
```

### **Debug Commands**
```bash
# Check all running processes
ps aux | grep -E "(anvil|next|forge)"

# Check port usage
lsof -i :3000
lsof -i :8545

# Check logs
cd frontend && npm run dev 2>&1 | tee frontend.log
cd contracts && anvil 2>&1 | tee anvil.log
```

## 🔮 Future Enhancements

- [ ] IPFS integration for metadata storage
- [ ] Advanced review scoring algorithms
- [ ] Multi-signature review requirements
- [ ] Automated metadata validation
- [ ] Integration with other metadata standards
- [ ] Mobile-optimized interface
- [ ] Analytics dashboard
- [ ] API endpoints for external integrations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: Create an issue on GitHub
- **Discussions**: Use GitHub Discussions for questions
- **Documentation**: Check the inline code comments and this README

## 🙏 Acknowledgments

- Ethereum community for the ERC7730 standard
- Foundry team for the development framework
- OpenZeppelin for secure contract libraries
- Next.js team for the React framework
- Wagmi team for Ethereum React hooks

---

**Note**: This is a development version. Always test thoroughly on testnets before mainnet deployment.

## 📋 Quick Reference Commands

```bash
# Start development environment
cd erc7730-community-review-dapp/contracts && anvil &                    # Start blockchain
cd erc7730-community-review-dapp/contracts && forge script script/Deploy.s.sol --rpc-url http://127.0.0.1:8545 --broadcast  # Deploy contracts
cd erc7730-community-review-dapp/frontend && npm run dev                 # Start frontend

# Stop development environment
pkill anvil                               # Stop blockchain
pkill -f "next"                          # Stop frontend

# Check status
lsof -i :8545                            # Check blockchain port
lsof -i :3000                            # Check frontend port

# Generate ABI
cd erc7730-community-review-dapp/contracts && npm run generate-abi
cd erc7730-community-review-dapp/frontend && npm run generate-abi
```