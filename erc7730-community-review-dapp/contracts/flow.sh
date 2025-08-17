#!/bin/bash

# Flow EVM Testnet Deployment Script
# All values configured here

# Configuration
PRIVATE_KEY="0x7e3a30f14217349f4252e6681c7ccd7e3f93c699da64a6e1d1b2a7b6de219224"
RPC_URL="https://testnet.evm.nodes.onflow.org"
CHAIN_ID="545"
NETWORK_NAME="Flow EVM Testnet"

echo "🚀 Deploying to $NETWORK_NAME..."
echo "RPC: $RPC_URL"
echo "Chain ID: $CHAIN_ID"

# Deploy contract
forge script script/Deploy.s.sol --rpc-url $RPC_URL --broadcast

# Get deployed address from broadcast file
DEPLOYED_ADDRESS=$(cat broadcast/Deploy.s.sol/$CHAIN_ID/run-latest.json | grep "contractAddress" | head -1 | sed 's/.*"contractAddress": "\([^"]*\)".*/\1/' | tr -d '[:space:]')

if [ ! -z "$DEPLOYED_ADDRESS" ]; then
    echo "✅ Contract deployed at: $DEPLOYED_ADDRESS"
    
    # Update frontend .env.local
    FRONTEND_ENV="../frontend/.env.local"
    if [ -f "$FRONTEND_ENV" ]; then
        # Update or add contract address
        if grep -q "NEXT_PUBLIC_CONTRACT_ADDRESS" "$FRONTEND_ENV"; then
            sed -i '' "s/NEXT_PUBLIC_CONTRACT_ADDRESS=.*/NEXT_PUBLIC_CONTRACT_ADDRESS=$DEPLOYED_ADDRESS/" "$FRONTEND_ENV"
        else
            echo "NEXT_PUBLIC_CONTRACT_ADDRESS=$DEPLOYED_ADDRESS" >> "$FRONTEND_ENV"
        fi
        
        # Update network settings
        sed -i '' "s|NEXT_PUBLIC_RPC_URL=.*|NEXT_PUBLIC_RPC_URL=$RPC_URL|" "$FRONTEND_ENV"
        sed -i '' "s|NEXT_PUBLIC_CHAIN_ID=.*|NEXT_PUBLIC_CHAIN_ID=$CHAIN_ID|" "$FRONTEND_ENV"
        
        echo "✅ Frontend .env.local updated"
    fi
    

    
    echo "🎉 Deployment complete! Frontend updated automatically."
else
    echo "❌ Failed to get deployed address"
    exit 1
fi
