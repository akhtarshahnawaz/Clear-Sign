// Auto-generated TypeScript types for ERC7730CommunityReview
// Generated on: 2025-08-17T01:45:20.564Z

export interface ContractFunction {
  name: string;
  inputs: Array<{
    name: string;
    type: string;
    internalType: string;
    indexed?: boolean;
  }>;
  outputs: Array<{
    name: string;
    type: string;
    internalType: string;
  }>;
  stateMutability: string;
  type: string;
}

export interface ContractEvent {
  name: string;
  inputs: Array<{
    name: string;
    type: string;
    internalType: string;
    indexed: boolean;
  }>;
  type: string;
  anonymous: boolean;
}

// Contract function types
export type ContractFunctions = {
  contractToSubmission: (: address) => Promise<uint256>;
  deactivateSubmission: (submissionId: uint256) => Promise<void>;
  getReliabilityScore: (submissionId: uint256) => Promise<uint256>;
  getSubmission: (submissionId: uint256) => Promise<tuple>;
  getSubmissionByContract: (contractAddress: address) => Promise<uint256>;
  getSubmissionReviews: (submissionId: uint256) => Promise<uint256[] | tuple[]>;
  getTotalReviews: () => Promise<uint256>;
  getTotalSubmissions: () => Promise<uint256>;
  getUserSubmissions: (user: address) => Promise<uint256[]>;
  hasReviewed: (: address, : uint256) => Promise<bool>;
  owner: () => Promise<address>;
  renounceOwnership: () => Promise<void>;
  reviews: (: uint256, : uint256) => Promise<address | bool | string | uint256>;
  submissions: (: uint256) => Promise<address | address | string | string | uint256 | bool | uint256 | uint256 | uint256>;
  submitMetadata: (contractAddress: address, walrusBlobId: string, hypergraphId: string) => Promise<void>;
  submitReview: (submissionId: uint256, isApproved: bool, comment: string) => Promise<void>;
  transferOwnership: (newOwner: address) => Promise<void>;
  userSubmissions: (: address, : uint256) => Promise<uint256>;
};

// Contract event types
export type ContractEvents = {
  MetadataSubmitted: (submissionId: uint256, submitter: address, contractAddress: address, walrusBlobId: string, hypergraphId: string, timestamp: uint256) => void;
  OwnershipTransferred: (previousOwner: address, newOwner: address) => void;
  ReviewSubmitted: (submissionId: uint256, reviewId: uint256, reviewer: address, isApproved: bool, comment: string, timestamp: uint256) => void;
  SubmissionDeactivated: (submissionId: uint256, submitter: address, timestamp: uint256) => void;
};

// Main contract interface
export interface ERC7730CommunityReviewContract {
  functions: ContractFunctions;
  events: ContractEvents;
  address: string;
  abi: typeof ERC7730COMMUNITYREVIEW_ABI;
}
