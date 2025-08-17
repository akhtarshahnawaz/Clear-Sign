# ABI Generation Scripts

This directory contains scripts for automatically generating contract ABIs and TypeScript types for the frontend.

## 🚀 Automatic ABI Generation

The frontend now automatically gets the latest contract ABI whenever you build your contracts!

### **How It Works:**

1. **Build Contracts**: `forge build` generates build artifacts in `out/`
2. **Auto-Generate ABI**: Post-build hook runs `scripts/generate-abi.js`
3. **Frontend Updated**: ABI and types are automatically copied to `frontend/src/lib/`

### **Files Generated:**

- `frontend/src/lib/contract-abi.ts` - Contract ABI and metadata
- `frontend/src/lib/contract-types.ts` - TypeScript type definitions

## 📋 Available Scripts

### **From Contracts Directory:**
```bash
# Build contracts and generate ABI
npm run build

# Generate ABI only
npm run generate-abi

# Clean build artifacts
npm run clean

# Run tests with gas reporting
npm run gas-report
```

### **From Frontend Directory:**
```bash
# Generate ABI before starting dev server
npm run generate-abi

# Start dev server (auto-generates ABI first)
npm run dev

# Build for production (auto-generates ABI first)
npm run build
```

## 🔧 Manual ABI Generation

If you need to manually generate the ABI:

```bash
cd contracts
forge build
npm run generate-abi
```

## 📁 File Structure

```
contracts/
├── scripts/
│   ├── generate-abi.js      # Main ABI generation script
│   └── README.md            # This file
├── out/                     # Foundry build artifacts
│   └── ERC7730CommunityReview.sol/
│       └── ERC7730CommunityReview.json
└── package.json             # Scripts and dependencies

frontend/
└── src/
    └── lib/
        ├── contract-abi.ts   # Generated ABI (auto-updated)
        └── contract-types.ts # Generated types (auto-updated)
```

## 🎯 Benefits

✅ **Always Up-to-Date**: ABI automatically matches deployed contract
✅ **No Manual Work**: Runs automatically after every build
✅ **Type Safety**: Generates TypeScript types for better development
✅ **Version Control**: Tracks ABI changes in git
✅ **Error Prevention**: Eliminates ABI mismatch bugs

## 🚨 Troubleshooting

### **ABI Not Generated:**
```bash
# Check if contracts built successfully
cd contracts
forge build

# Check if script has permissions
chmod +x scripts/generate-abi.js

# Run manually
npm run generate-abi
```

### **Frontend Can't Access ABI:**
```bash
# Check if files exist
ls -la frontend/src/lib/contract-abi.ts
ls -la frontend/src/lib/contract-types.ts

# Regenerate ABI
cd contracts && npm run generate-abi
```

### **Permission Errors:**
```bash
# Check file permissions
ls -la scripts/generate-abi.js

# Make executable
chmod +x scripts/generate-abi.js
```

## 🔮 Future Enhancements

- [ ] Generate React hooks from ABI
- [ ] Generate contract deployment scripts
- [ ] Generate test utilities
- [ ] Support multiple contracts
- [ ] Generate documentation from ABI
