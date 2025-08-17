#!/bin/bash

# ERC7730 Community Review DApp - ABI Generation Workflow
# This script demonstrates the complete workflow for generating and updating contract ABIs

set -e  # Exit on any error

echo "🚀 ERC7730 Community Review DApp - ABI Generation Workflow"
echo "=========================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if we're in the right directory
if [ ! -f "foundry.toml" ]; then
    print_error "This script must be run from the contracts directory"
    exit 1
fi

print_info "Starting ABI generation workflow..."

# Step 1: Clean previous build artifacts
print_info "Step 1: Cleaning previous build artifacts..."
forge clean
print_status "Build artifacts cleaned"

# Step 2: Build contracts
print_info "Step 2: Building contracts with Foundry..."
forge build
print_status "Contracts built successfully"

# Step 3: Generate ABI for frontend
print_info "Step 3: Generating ABI for frontend..."
npm run generate-abi
print_status "ABI generated successfully"

# Step 4: Verify files were created
print_info "Step 4: Verifying generated files..."
FRONTEND_ABI_DIR="../../frontend/src/lib"

if [ -f "$FRONTEND_ABI_DIR/contract-abi.ts" ]; then
    print_status "contract-abi.ts created successfully"
    ABI_SIZE=$(wc -l < "$FRONTEND_ABI_DIR/contract-abi.ts")
    print_info "ABI file size: $ABI_SIZE lines"
else
    print_error "contract-abi.ts was not created"
    exit 1
fi

if [ -f "$FRONTEND_ABI_DIR/contract-types.ts" ]; then
    print_status "contract-types.ts created successfully"
    TYPES_SIZE=$(wc -l < "$FRONTEND_ABI_DIR/contract-types.ts")
    print_info "Types file size: $TYPES_SIZE lines"
else
    print_error "contract-types.ts was not created"
    exit 1
fi

# Step 5: Show summary
echo ""
print_status "🎉 ABI Generation Workflow Completed Successfully!"
echo ""
print_info "Generated files:"
echo "  📁 $FRONTEND_ABI_DIR/contract-abi.ts"
echo "  📁 $FRONTEND_ABI_DIR/contract-types.ts"
echo ""
print_info "Next steps:"
echo "  1. The frontend will automatically use the new ABI"
echo "  2. Run 'npm run dev' in the frontend directory to test"
echo "  3. The ABI will be automatically updated on every 'forge build'"
echo ""
print_warning "Note: You can also run 'npm run generate-abi' manually anytime"
print_warning "      or use the pre-commit hooks in the frontend package.json"
echo ""

# Optional: Test frontend ABI generation
read -p "Would you like to test frontend ABI generation? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_info "Testing frontend ABI generation..."
    cd ../frontend
    npm run generate-abi
    print_status "Frontend ABI generation test completed"
    cd ../contracts
fi

print_status "Workflow completed! 🎯"
