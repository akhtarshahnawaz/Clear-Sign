# ERC7730 Community Review Dapp

A decentralized application for community review of ERC7730 metadata submissions. This dapp allows users to submit, review, and search for smart contract metadata with community-driven quality assurance.

## 🏗️ Project Structure

```
erc7730-community-review-dapp/
├── contracts/                 # Foundry smart contracts
│   ├── src/
│   │   └── ERC7730CommunityReview.sol
│   ├── test/
│   │   └── ERC7730CommunityReview.t.sol
│   ├── script/
│   │   └── Deploy.s.sol
│   └── foundry.toml
├── frontend/                  # Next.js frontend application
│   ├── src/
│   │   ├── app/              # App router pages
│   │   ├── components/       # React components
│   │   ├── hooks/            # Custom hooks
│   │   ├── lib/              # Utilities and constants
│   │   └── types/            # TypeScript types
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## 🚀 Features

### 1. Metadata Submission
- Submit ERC7730 metadata for community review
- Include contract ID, Walrus blob ID, and Hypergraph ID
- MetaMask wallet integration for transaction signing
- Form validation and error handling

### 2. Community Review System
- View all submitted metadata
- Review submissions with approval/rejection
- Add comments explaining review decisions
- Calculate reliability scores based on community feedback
- Prevent self-reviewing and duplicate reviews

### 3. Metadata Search
- Search metadata by contract ID
- Display comprehensive metadata information
- Show review statistics and reliability scores
- Direct links to Walrus and Hypergraph

## 🛠️ Technology Stack

### Backend (Smart Contracts)
- **Foundry**: Ethereum development framework
- **Solidity**: Smart contract language (v0.8.19)
- **OpenZeppelin**: Secure contract libraries
- **Hardhat**: Development and testing environment

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Wagmi**: React hooks for Ethereum
- **MetaMask**: Wallet connection and transaction signing

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- Foundry (for smart contract development)
- MetaMask wallet extension
- Basic knowledge of Ethereum and Solidity

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd erc7730-community-review-dapp
```

### 2. Smart Contract Setup
```bash
cd contracts

# Install dependencies
forge install

# Compile contracts
forge build

# Run tests
forge test

# Deploy to local network (requires local node)
forge script script/Deploy.s.sol --rpc-url http://localhost:8545 --broadcast
```

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Set environment variables
cp .env.example .env.local
# Update CONTRACT_ADDRESS in .env.local with deployed contract address

# Run development server
npm run dev
```

### 4. Configure Contract Address
Update the contract address in `frontend/src/lib/constants.ts` with your deployed contract address.

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the frontend directory:

```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0x... # Your deployed contract address
NEXT_PUBLIC_RPC_URL=https://...    # Your RPC endpoint
NEXT_PUBLIC_CHAIN_ID=11155111      # Network chain ID (Sepolia testnet)
```

### Network Configuration
The dapp supports:
- Ethereum Mainnet (Chain ID: 1)
- Sepolia Testnet (Chain ID: 11155111)
- Local Development (Chain ID: 31337)

## 📱 Usage

### 1. Connect Wallet
- Click "Connect Wallet" in the header
- Approve MetaMask connection
- Ensure you're on the correct network

### 2. Submit Metadata
- Navigate to the home page
- Fill in contract ID, Walrus blob ID, and Hypergraph ID
- Click "Submit for Review"
- Confirm transaction in MetaMask

### 3. Review Submissions
- Go to the "Review" page
- Browse available submissions
- Click "Review" to open submission details
- Choose approve/reject and add comment
- Submit review transaction

### 4. Search Metadata
- Visit the "Search" page
- Enter a contract ID
- View metadata details and review statistics
- Access Walrus and Hypergraph links

## 🧪 Testing

### Smart Contract Tests
```bash
cd contracts
forge test                    # Run all tests
forge test -vv               # Verbose output
forge test --match-test testSubmitMetadata  # Run specific test
```

### Frontend Tests
```bash
cd frontend
npm run test                 # Run test suite
npm run test:watch          # Watch mode
npm run test:coverage       # Coverage report
```

## 🚀 Deployment

### Smart Contract Deployment

1. **Local Development**
```bash
forge script script/Deploy.s.sol --rpc-url http://localhost:8545 --broadcast
```

2. **Testnet Deployment**
```bash
# Set private key
export PRIVATE_KEY=your_private_key_here

# Deploy to Sepolia
forge script script/Deploy.s.sol --rpc-url $SEPOLIA_RPC_URL --broadcast --verify
```

3. **Mainnet Deployment**
```bash
# Verify configuration and private key
forge script script/Deploy.s.sol --rpc-url $MAINNET_RPC_URL --broadcast --verify
```

### Frontend Deployment

1. **Build the application**
```bash
npm run build
```

2. **Deploy to Vercel/Netlify**
- Connect your repository
- Set environment variables
- Deploy automatically on push

## 🔒 Security Features

- **Access Control**: Only submitters can deactivate their submissions
- **Review Prevention**: Users cannot review their own submissions
- **Duplicate Prevention**: One review per user per submission
- **Input Validation**: Comprehensive form validation
- **Secure Transactions**: MetaMask integration for transaction signing

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

## 🔮 Future Enhancements

- [ ] IPFS integration for metadata storage
- [ ] Advanced review scoring algorithms
- [ ] Multi-signature review requirements
- [ ] Automated metadata validation
- [ ] Integration with other metadata standards
- [ ] Mobile-optimized interface
- [ ] Analytics dashboard
- [ ] API endpoints for external integrations

## 🙏 Acknowledgments

- Ethereum community for the ERC7730 standard
- Foundry team for the development framework
- OpenZeppelin for secure contract libraries
- Next.js team for the React framework
- Wagmi team for Ethereum React hooks

---

**Note**: This is a development version. Always test thoroughly on testnets before mainnet deployment.