#!/bin/bash

# Anvil Local Deployment Script
# All values configured here

# Configuration
PRIVATE_KEY="0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
RPC_URL="http://127.0.0.1:8545"
CHAIN_ID="31337"
NETWORK_NAME="Anvil Local"

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
