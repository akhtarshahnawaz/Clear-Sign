# ERC7730 Community Review Smart Contracts

This directory contains the smart contracts for the ERC7730 Community Review Dapp.

## Overview

The main contract `ERC7730CommunityReview.sol` provides functionality for:
- Submitting ERC7730 metadata for community review
- Reviewing submitted metadata
- Managing submission lifecycle
- Calculating reliability scores

## Contract Functions

### Core Functions
- `submitMetadata(contractId, walrusBlobId, hypergraphId)` - Submit new metadata for review
- `submitReview(submissionId, isApproved, comment)` - Review a submission
- `deactivateSubmission(submissionId)` - Deactivate own submission

### View Functions
- `getSubmission(submissionId)` - Get submission details
- `getSubmissionByContract(contractId)` - Find submission by contract ID
- `getSubmissionReviews(submissionId)` - Get all reviews for a submission
- `getReliabilityScore(submissionId)` - Calculate reliability score (0-100)
- `getUserSubmissions(user)` - Get user's submissions
- `getTotalSubmissions()` - Get total submission count
- `getTotalReviews()` - Get total review count

## Testing

Run the test suite:
```bash
forge test
```

Run with verbose output:
```bash
forge test -vv
```

## Deployment

1. Set your private key in environment:
```bash
export PRIVATE_KEY=your_private_key_here
```

2. Deploy to local network:
```bash
forge script script/Deploy.s.sol --rpc-url http://localhost:8545 --broadcast
```

3. Deploy to testnet:
```bash
forge script script/Deploy.s.sol --rpc-url $RPC_URL --broadcast --verify
```

## Contract Addresses

After deployment, the contract address will be displayed in the console output.

## Dependencies

- OpenZeppelin Contracts v5.4.0
- Foundry Standard Library
