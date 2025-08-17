export interface Submission {
  id: number
  submitter: `0x${string}`
  contractAddress: `0x${string}` // Changed from contractId to contractAddress
  walrusBlobId: string
  hypergraphId: string
  submissionTime: number
  isActive: boolean
  totalReviews: number
  positiveReviews: number
  negativeReviews: number
  reliabilityScore: number
}

export interface Review {
  reviewer: `0x${string}`
  isApproved: boolean
  comment: string
  reviewTime: number
}

export interface SubmissionWithReviews extends Submission {
  reviews: Review[]
}

export interface ContractMetadata {
  contractAddress: `0x${string}` // Changed from contractId to contractAddress
  submitter: `0x${string}`
  walrusBlobId: string
  hypergraphId: string
  reliabilityScore: number
  totalReviews: number
  positiveReviews: number
  negativeReviews: number
  submissionTime: number
}
